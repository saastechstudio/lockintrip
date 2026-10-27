// Télécharge des photos Unsplash identifiées via l'API officielle (clé gratuite : secret UNSPLASH_ACCESS_KEY).
// Respecte les règles de l'API : déclenchement de download_location et crédit du photographe dans unsplash/credits.json.
import fs from "node:fs";
const key = process.env.UNSPLASH_ACCESS_KEY;
const ids = JSON.parse(fs.readFileSync("unsplash.json", "utf8"));
const log = [];
const L = (...a) => { console.log(...a); log.push(a.join(" ")); };
const credits = [];
const done = JSON.parse(fs.existsSync("done.json") ? fs.readFileSync("done.json", "utf8") : "[]");
fs.mkdirSync("unsplash", { recursive: true });
if (!key) L("Clé UNSPLASH_ACCESS_KEY absente : rien à faire.");
else {
  const k = key.trim();
  L("clé : longueur", k.length, "espaces en trop", k.length !== key.length, "guillemets", /["']/.test(k));
  const t = await fetch("https://api.unsplash.com/photos/random", { headers: { Authorization: `Client-ID ${k}`, "Accept-Version": "v1" } });
  L("test api", t.status, (await t.text()).slice(0, 200));
}
if (key) for (const [cat, list] of Object.entries(ids)) {
  for (const id of list) {
    try {
      const r = await fetch(`https://api.unsplash.com/photos/${id}`, { headers: { Authorization: `Client-ID ${key.trim()}`, "Accept-Version": "v1" }, signal: AbortSignal.timeout(20000) });
      L(cat, id, "api", r.status);
      if (!r.ok) continue;
      const p = await r.json();
      if (p.premium || p.plus) { L(cat, id, "Unsplash+ ignorée"); continue; }
      L(cat, id, "reste", r.headers.get("x-ratelimit-remaining"));
      if (!done.includes(id)) {
        await fetch(`${p.links.download_location}`, { headers: { Authorization: `Client-ID ${key.trim()}` } });
        const img = await fetch(`${p.urls.raw}&w=1200&q=70&fm=jpg&fit=max`, { signal: AbortSignal.timeout(60000) });
        if (img.ok) fs.writeFileSync(`unsplash/${cat}--${id}.jpg`, Buffer.from(await img.arrayBuffer()));
      }
      credits.push({ cat, file: `${cat}--${id}.jpg`, id, raw: p.urls.raw.split("?")[0] + "?" + new URLSearchParams([...new URL(p.urls.raw).searchParams].filter(([k]) => k === "ixid" || k === "ixlib")), w: p.width, h: p.height, color: p.color, blur: p.blur_hash, alt: p.alt_description, author: p.user?.name, authorUrl: `${p.user?.links?.html}?utm_source=lockintrip&utm_medium=referral`, page: `${p.links.html}?utm_source=lockintrip&utm_medium=referral` });
    } catch (e) { L(cat, id, "ERR", e.message); }
  }
}
fs.writeFileSync("unsplash/credits.json", JSON.stringify(credits, null, 1));
fs.writeFileSync("unsplash/log.txt", log.join("\n"));
