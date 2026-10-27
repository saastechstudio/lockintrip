// Télécharge des photos Unsplash identifiées via l'API officielle (clé gratuite : secret UNSPLASH_ACCESS_KEY).
// Respecte les règles de l'API : déclenchement de download_location et crédit du photographe dans unsplash/credits.json.
import fs from "node:fs";
const key = process.env.UNSPLASH_ACCESS_KEY;
const ids = JSON.parse(fs.readFileSync("unsplash.json", "utf8"));
const log = [];
const L = (...a) => { console.log(...a); log.push(a.join(" ")); };
const credits = [];
fs.mkdirSync("unsplash", { recursive: true });
if (!key) L("Clé UNSPLASH_ACCESS_KEY absente : rien à faire.");
else for (const [cat, list] of Object.entries(ids)) {
  for (const id of list) {
    try {
      const r = await fetch(`https://api.unsplash.com/photos/${id}`, { headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" }, signal: AbortSignal.timeout(20000) });
      L(cat, id, "api", r.status);
      if (!r.ok) continue;
      const p = await r.json();
      if (p.premium || p.plus) { L(cat, id, "Unsplash+ ignorée"); continue; }
      await fetch(`${p.links.download_location}`, { headers: { Authorization: `Client-ID ${key}` } });
      const img = await fetch(`${p.urls.raw}&w=2400&q=85&fm=jpg&fit=max`, { signal: AbortSignal.timeout(60000) });
      L(cat, id, "image", img.status);
      if (!img.ok) continue;
      fs.writeFileSync(`unsplash/${cat}--${id}.jpg`, Buffer.from(await img.arrayBuffer()));
      credits.push({ file: `${cat}--${id}.jpg`, id, alt: p.alt_description, author: p.user?.name, authorUrl: `${p.user?.links?.html}?utm_source=lockintrip&utm_medium=referral`, page: `${p.links.html}?utm_source=lockintrip&utm_medium=referral` });
    } catch (e) { L(cat, id, "ERR", e.message); }
  }
}
fs.writeFileSync("unsplash/credits.json", JSON.stringify(credits, null, 1));
fs.writeFileSync("unsplash/log.txt", log.join("\n"));
