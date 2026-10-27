// Récupère des photos libres d'usage commercial pour revue (Unsplash, puis Openverse en repli), puis les versions finales.
import fs from "node:fs";
const T = () => AbortSignal.timeout(20000);
const log = [];
const L = (...a) => { console.log(...a); log.push(a.join(" ")); };
const ua = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", "Accept-Language": "en-US,en;q=0.9" };
const out = [];

async function unsplashHtml(q) {
  const r = await fetch(`https://unsplash.com/s/photos/${encodeURIComponent(q.replace(/ /g, "-"))}?license=free`, { headers: { ...ua, Accept: "text/html" }, signal: T() });
  L("unsplash-html", q, r.status);
  if (!r.ok) return [];
  const html = await r.text();
  const ids = [...new Set([...html.matchAll(/https:\/\/images\.unsplash\.com\/(photo-[\w-]+)/g)].map((m) => m[1]))];
  return ids.map((id) => ({ id, raw: `https://images.unsplash.com/${id}`, src: "unsplash" }));
}
async function unsplashNapi(q) {
  const r = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30`, { headers: { ...ua, Accept: "application/json" }, signal: T() });
  L("unsplash-napi", q, r.status);
  if (!r.ok) return [];
  return (await r.json()).results.filter((p) => !p.premium && !p.plus && p.urls?.raw?.includes("images.unsplash.com"))
    .map((p) => ({ id: p.id, raw: p.urls.raw.split("?")[0], alt: p.alt_description, author: p.user?.name, page: p.links?.html, src: "unsplash" }));
}
async function openverse(q) {
  const r = await fetch(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial,modification&size=large&page_size=20`, { headers: { ...ua, Accept: "application/json" }, signal: T() });
  L("openverse", q, r.status);
  if (!r.ok) return [];
  return (await r.json()).results.map((p) => ({ id: p.id, raw: p.url, alt: p.title, author: p.creator, page: p.foreign_landing_url, license: `${p.license} ${p.license_version}`, src: "openverse" }));
}

for (const q of JSON.parse(fs.readFileSync("queries.json", "utf8"))) {
  const dir = `candidates/${q.slug}`;
  fs.mkdirSync(dir, { recursive: true });
  let list = [];
  for (const fn of [unsplashNapi, unsplashHtml, openverse]) {
    try { list = await fn(q.q); } catch (e) { L(fn.name, "ERR", e.message); }
    if (list.length) break;
  }
  let n = 0;
  for (const p of list.slice(0, 12)) {
    try {
      const url = p.src === "unsplash" ? `${p.raw}?w=480&q=70&fm=jpg&fit=max` : p.raw;
      const img = await fetch(url, { headers: ua, signal: T() });
      if (!img.ok) { L("img", img.status, url); continue; }
      fs.writeFileSync(`${dir}/${String(n).padStart(2, "0")}.jpg`, Buffer.from(await img.arrayBuffer()));
      out.push({ slug: q.slug, idx: n, ...p });
      n++;
    } catch (e) { L("img ERR", e.message); }
  }
  L(q.slug, "saved", n);
}
fs.writeFileSync("candidates/manifest.json", JSON.stringify(out, null, 1));
if (fs.existsSync("final.json")) {
  fs.mkdirSync("final", { recursive: true });
  for (const f of JSON.parse(fs.readFileSync("final.json", "utf8"))) {
    const url = f.raw.includes("images.unsplash.com") ? `${f.raw}?w=${f.w ?? 2000}&q=80&fm=jpg&fit=max` : f.raw;
    const r = await fetch(url, { headers: ua, signal: T() });
    L("final", f.name, r.status);
    if (r.ok) fs.writeFileSync(`final/${f.name}.jpg`, Buffer.from(await r.arrayBuffer()));
  }
}
fs.writeFileSync("candidates/log.txt", log.join("\n"));
