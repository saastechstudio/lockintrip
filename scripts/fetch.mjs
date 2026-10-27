// Récupère des photos Unsplash (licence gratuite uniquement) pour revue, puis les versions finales.
import fs from "node:fs";
const ua = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36", Accept: "application/json" };
const out = [];
for (const q of JSON.parse(fs.readFileSync("queries.json", "utf8"))) {
  const dir = `candidates/${q.slug}`;
  fs.mkdirSync(dir, { recursive: true });
  try {
    const r = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q.q)}&per_page=30&orientation=${q.o ?? "landscape"}`, { headers: ua });
    console.log(q.slug, r.status);
    if (!r.ok) continue;
    const free = (await r.json()).results.filter((p) => !p.premium && !p.plus && p.urls?.raw?.includes("images.unsplash.com"));
    let n = 0;
    for (const p of free.slice(0, q.n ?? 12)) {
      const img = await fetch(`${p.urls.raw}&w=480&q=70&fm=jpg&fit=max`);
      if (!img.ok) continue;
      fs.writeFileSync(`${dir}/${String(n).padStart(2, "0")}.jpg`, Buffer.from(await img.arrayBuffer()));
      out.push({ slug: q.slug, idx: n, id: p.id, raw: p.urls.raw.split("?")[0], w: p.width, h: p.height, alt: p.alt_description, author: p.user?.name, page: p.links?.html });
      n++;
    }
  } catch (e) { console.log(q.slug, "ERR", e.message); }
}
fs.writeFileSync("candidates/manifest.json", JSON.stringify(out, null, 1));
if (fs.existsSync("final.json")) {
  fs.mkdirSync("final", { recursive: true });
  for (const f of JSON.parse(fs.readFileSync("final.json", "utf8"))) {
    const r = await fetch(`${f.raw}?w=${f.w ?? 2000}&q=80&fm=jpg&fit=max`);
    console.log("final", f.name, r.status);
    if (r.ok) fs.writeFileSync(`final/${f.name}.jpg`, Buffer.from(await r.arrayBuffer()));
  }
}
