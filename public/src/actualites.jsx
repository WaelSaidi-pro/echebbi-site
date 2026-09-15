// actualites.jsx — section Actualités alimentée par le CMS (Directus).
// Repli automatique sur content/actualites.mock.json si le CMS est injoignable,
// pour que le site reste complet tant que le CMS n'est pas déployé.
//
// NB : on utilise React.useState / React.useEffect en toutes lettres.
// Un `const { useState } = React` en tête de fichier entrerait en collision
// avec celui d'app.jsx — les deux vivent dans le même scope lexical global.

const CMS_URL = "https://cms.college-lycee-echebbi.com";

const CMS_FIELDS =
  "id,titre_fr,titre_ar,contenu_fr,contenu_ar,categorie_fr,categorie_ar," +
  "date_publication,epingle,image,piece_jointe";

const CMS_QUERY =
  "/items/actualites" +
  "?filter[status][_eq]=published" +
  "&sort=-epingle,-date_publication" +
  "&fields=" + CMS_FIELDS +
  "&limit=9";

const NEWS_LOCALES = { fr: "fr-FR", ar: "ar-TN", en: "en-GB" };

// Un identifiant Directus -> URL transformée. Un chemin (mock) -> tel quel.
function assetUrl(v, params) {
  if (!v) return null;
  if (/^https?:\/\//.test(v) || v.indexOf("/") !== -1) return v;
  return CMS_URL + "/assets/" + v + (params ? "?" + params : "");
}

// Arabe si demandé ET disponible, sinon repli sur le français.
// Une actualité sans traduction arabe reste lisible plutôt que vide.
function pickLang(item, field, lang) {
  const ar = item[field + "_ar"];
  const fr = item[field + "_fr"];
  if (lang === "ar" && ar) return ar;
  return fr || ar || "";
}

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function excerpt(s, n) {
  const txt = stripHtml(s);
  if (txt.length <= n) return txt;
  return txt.slice(0, n).replace(/\s+\S*$/, "") + "…";
}

function formatNewsDate(iso, lang) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat(NEWS_LOCALES[lang] || "fr-FR", {
      day: "numeric", month: "long", year: "numeric",
    }).format(d);
  } catch (e) {
    return d.toISOString().slice(0, 10);
  }
}

function useActualites() {
  const [state, setState] = React.useState({ status: "loading", items: [] });

  React.useEffect(() => {
    let alive = true;
    const done = (status, items) => {
      if (alive) setState({ status: status, items: items || [] });
    };

    fetch(CMS_URL + CMS_QUERY, { headers: { Accept: "application/json" } })
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((j) => done("ready", j.data))
      .catch(() =>
        fetch("content/actualites.mock.json")
          .then((r) => r.json())
          .then((j) => done("ready", j.data))
          .catch(() => done("error"))
      );

    return () => { alive = false; };
  }, []);

  return state;
}

function News({ t, lang }) {
  const { status, items } = useActualites();
  const n = t.news;

  return (
    <section className="section parchment" id="news" data-screen-label="news">
      <div className="container">
        <Reveal>
          <div
            className="section-head"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none" }}
          >
            <div style={{ maxWidth: 620 }}>
              <div className="eyebrow-row">
                <span className="eyebrow">{n.eyebrow}</span>
              </div>
              <h2>{n.title}</h2>
              <p>{n.lede}</p>
            </div>
          </div>
        </Reveal>

        {status === "loading" && <p className="news-state">{n.loading}</p>}
        {status === "error" && <p className="news-state">{n.unavailable}</p>}
        {status === "ready" && items.length === 0 && <p className="news-state">{n.empty}</p>}

        {status === "ready" && items.length > 0 && (
          <div className="news">
            {items.map((it, i) => {
              const img = assetUrl(it.image, "width=800&format=webp&quality=80");
              const pdf = assetUrl(it.piece_jointe);
              const cat = pickLang(it, "categorie", lang);
              return (
                <Reveal key={it.id != null ? it.id : i} delay={i * 120}>
                  <article className="news-card">
                    <div className="thumb">
                      {it.epingle
                        ? <span className="badge pin">{n.pinned}</span>
                        : (cat ? <span className="badge">{cat}</span> : null)}
                      {img
                        ? <img src={img} alt="" loading="lazy" width="800" height="500" />
                        : <span className="label">{cat || ""}</span>}
                    </div>
                    <div className="body">
                      <div className="date">{formatNewsDate(it.date_publication, lang)}</div>
                      <h4>{pickLang(it, "titre", lang)}</h4>
                      <p>{excerpt(pickLang(it, "contenu", lang), 160)}</p>
                      {pdf && (
                        <a className="attach" href={pdf} target="_blank" rel="noopener noreferrer">
                          {n.download} <span className="arrow">&#8595;</span>
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
