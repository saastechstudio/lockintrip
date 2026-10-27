// Photos Unsplash via l'API officielle (secret UNSPLASH_ACCESS_KEY).
// Mode recherche (unsplash-queries.json) : vignettes + métadonnées pour revue, sans déclencher de téléchargement.
// Mode sélection (unsplash.json) : métadonnées (lien direct, auteur) et déclenchement de download_location.
import fs from "node:fs";
const key = process.env.UNSPLASH_ACCESS_KEY?.trim();
const H = { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" };
const log = [];
const L = (...a) => { console.log(...a); log.push(a.join(" ")); };
const api = async (path) => {
  const r = await fetch(`https://api.unsplash.com${path}`, { headers: H, signal: AbortSignal.timeout(20000) });
  L(path.slice(0, 70), r.status, "reste", r.headers.get("x-ratelimit-remaining"));
  return r.ok ? r.json() : null;
};
const meta = (p, extra) => ({ ...extra, id: p.id, raw: `${p.urls.raw.split("?")[0]}?ixid=${new URL(p.urls.raw).searchParams.get("ixid") ?? ""}`, w: p.width, h: p.height, alt: p.alt_description, location: p.location?.title ?? null, author: p.user?.name, authorUrl: `${p.user?.links?.html}?utm_source=lockintrip&utm_medium=referral`, page: `${p.links.html}?utm_source=lockintrip&utm_medium=referral`, download: p.links.download_location });
fs.mkdirSync("unsplash/candidates", { recursive: true });
if (!key) L("Clé absente");
else {
  if (fs.existsSync("unsplash-queries.json")) {
    const out = [];
    for (const q of JSON.parse(fs.readFileSync("unsplash-queries.json", "utf8"))) {
      const j = await api(`/search/photos?query=${encodeURIComponent(q.q)}&per_page=30&orientation=${q.o ?? "landscape"}&content_filter=high`);
      if (!j) continue;
      let n = 0;
      for (const p of j.results) {
        if (p.premium || p.plus || n >= (q.n ?? 16)) continue;
        const img = await fetch(`${p.urls.raw}&w=480&q=70&fm=jpg&fit=max`);
        if (!img.ok) continue;
        fs.writeFileSync(`unsplash/candidates/${q.slug}-${String(n).padStart(2, "0")}.jpg`, Buffer.from(await img.arrayBuffer()));
        out.push(meta(p, { slug: q.slug, idx: n }));
        n++;
      }
    }
    fs.writeFileSync("unsplash/candidates/manifest.json", JSON.stringify(out, null, 1));
  }
  if (fs.existsSync("unsplash.json")) {
    const sel = [];
    for (const [name, id] of Object.entries(JSON.parse(fs.readFileSync("unsplash.json", "utf8")))) {
      const p = await api(`/photos/${id}`);
      if (!p || p.premium || p.plus) continue;
      await fetch(p.links.download_location, { headers: H });
      sel.push(meta(p, { name }));
    }
    fs.writeFileSync("unsplash/selection.json", JSON.stringify(sel, null, 1));
  }
}
fs.writeFileSync("unsplash/log.txt", log.join("\n"));
