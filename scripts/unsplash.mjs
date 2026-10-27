// Télécharge des photos Unsplash identifiées (licence Unsplash gratuite), via l'URL de téléchargement publique.
import fs from "node:fs";
const ids = JSON.parse(fs.readFileSync("unsplash.json", "utf8"));
const ua = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", Accept: "image/avif,image/webp,image/*,*/*" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = [];
const L = (...a) => { console.log(...a); log.push(a.join(" ")); };
fs.mkdirSync("unsplash", { recursive: true });
for (const [cat, list] of Object.entries(ids)) {
  for (const id of list) {
    await sleep(1500);
    try {
      const r = await fetch(`https://unsplash.com/photos/${id}/download?force=true`, { headers: ua, redirect: "manual", signal: AbortSignal.timeout(20000) });
      const loc = r.headers.get("location");
      L(cat, id, "download", r.status, loc ? loc.slice(0, 120) : "");
      if (!loc || !loc.includes("images.unsplash.com")) continue;
      const u = new URL(loc);
      u.searchParams.set("w", "2400");
      u.searchParams.set("q", "85");
      u.searchParams.set("fm", "jpg");
      u.searchParams.set("fit", "max");
      u.searchParams.delete("force");
      const img = await fetch(u, { headers: ua, signal: AbortSignal.timeout(60000) });
      L(cat, id, "image", img.status, u.pathname);
      if (img.ok) fs.writeFileSync(`unsplash/${cat}--${id}.jpg`, Buffer.from(await img.arrayBuffer()));
    } catch (e) { L(cat, id, "ERR", e.message); }
  }
}
fs.writeFileSync("unsplash/log.txt", log.join("\n"));
