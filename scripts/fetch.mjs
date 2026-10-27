// Récupère des photos libres d'usage commercial (Pexels, Burst, Wikimedia) pour revue, puis les versions finales.
import fs from "node:fs";
const T = () => AbortSignal.timeout(20000);
const log = [];
const L = (...a) => { console.log(...a); log.push(a.join(" ")); };
const ua = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", "Accept-Language": "en-US,en;q=0.9", Accept: "text/html,application/json" };
const get = async (name, url) => { const r = await fetch(url, { headers: ua, signal: T() }); L(name, r.status, url.slice(0, 90)); return r.ok ? r : null; };

const sources = {
  // API officielle Pexels (clé gratuite, secret GitHub PEXELS_API_KEY). Licence Pexels : usage commercial libre.
  async pexelsApi(q) {
    if (!process.env.PEXELS_API_KEY) { L("pexelsApi", "pas de clé"); return []; }
    const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=15&orientation=${q.includes("portrait") ? "portrait" : "landscape"}`, { headers: { Authorization: process.env.PEXELS_API_KEY }, signal: T() });
    L("pexelsApi", r.status, q);
    if (!r.ok) return [];
    return (await r.json()).photos.map((p) => ({ id: String(p.id), raw: p.src.original, thumb: `${p.src.original}?auto=compress&w=480`, w: p.width, h: p.height, alt: p.alt, author: p.photographer, page: p.url, license: "Pexels" }));
  },
  async pexels(q) {
    const r = await get("pexels", `https://www.pexels.com/search/${encodeURIComponent(q)}/`);
    if (!r) return [];
    const html = await r.text();
    const ids = [...new Set([...html.matchAll(/images\.pexels\.com\/photos\/(\d+)\/([\w.-]+?\.(?:jpe?g|png))/g)].map((m) => `${m[1]}/${m[2]}`))];
    return ids.map((p) => ({ id: p, raw: `https://images.pexels.com/photos/${p}`, thumb: `https://images.pexels.com/photos/${p}?auto=compress&w=480`, license: "Pexels" }));
  },
  async burst(q) {
    const r = await get("burst", `https://burst.shopify.com/photos/search?q=${encodeURIComponent(q)}`);
    if (!r) return [];
    const html = await r.text();
    const ids = [...new Set([...html.matchAll(/burst\.shopifycdn\.com\/photos\/([\w-]+)\.jpg/g)].map((m) => m[1]))];
    return ids.map((p) => ({ id: p, raw: `https://burst.shopifycdn.com/photos/${p}.jpg`, thumb: `https://burst.shopifycdn.com/photos/${p}_480x.jpg`, license: "Burst" }));
  },
  async wikimedia(q) {
    const r = await get("wikimedia", `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q + " filetype:bitmap")}&gsrlimit=20&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=480&format=json`);
    if (!r) return [];
    const pages = Object.values((await r.json()).query?.pages ?? {});
    return pages.filter((p) => p.imageinfo?.[0]?.width >= 2000).map((p) => {
      const i = p.imageinfo[0];
      return { id: p.title, raw: i.url, thumb: i.thumburl, w: i.width, author: i.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, ""), license: i.extmetadata?.LicenseShortName?.value, page: i.descriptionurl };
    });
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const only = process.env.SOURCES?.split(",");
const out = [];
for (const q of JSON.parse(fs.readFileSync("queries.json", "utf8"))) {
  const dir = `candidates/${q.slug}`;
  fs.mkdirSync(dir, { recursive: true });
  let n = 0;
  for (const [name, fn] of Object.entries(sources)) {
    if (only && !only.includes(name)) continue;
    await sleep(6000);
    let list = [];
    try { list = await fn(q.q); } catch (e) { L(name, "ERR", e.message); }
    for (const p of list.slice(0, q.n ?? 8)) {
      try {
        const img = await fetch(p.thumb, { headers: ua, signal: T() });
        if (!img.ok) { L("img", img.status, p.thumb); continue; }
        fs.writeFileSync(`${dir}/${String(n).padStart(2, "0")}.jpg`, Buffer.from(await img.arrayBuffer()));
        out.push({ slug: q.slug, idx: n, source: name, ...p });
        n++;
      } catch (e) { L("img ERR", e.message); }
    }
  }
  L(q.slug, "saved", n);
}
fs.writeFileSync("candidates/manifest.json", JSON.stringify(out, null, 1));
if (fs.existsSync("final.json")) {
  fs.mkdirSync("final", { recursive: true });
  for (const f of JSON.parse(fs.readFileSync("final.json", "utf8"))) {
    const r = await fetch(f.url, { headers: ua, signal: AbortSignal.timeout(60000) });
    L("final", f.name, r.status);
    if (r.ok) fs.writeFileSync(`final/${f.name}.jpg`, Buffer.from(await r.arrayBuffer()));
  }
}
fs.writeFileSync("candidates/log.txt", log.join("\n"));
