// banniere.jsx — bandeau d'annonces en tete de page, alimente par le CMS.
// Reutilise CMS_URL et pickLang definis dans actualites.jsx : ce fichier doit
// donc etre charge APRES lui dans index.html.
//
// Plusieurs annonces peuvent defiler. Les garde-fous d'ergonomie :
//  - defilement lent (8 s) : le temps de lire une phrase sans se presser ;
//  - pause au survol ET au focus clavier : on ne perd pas un message qu'on lit ;
//  - aucun defilement automatique si le visiteur a demande a son systeme de
//    reduire les animations — il navigue alors avec les puces ;
//  - des puces cliquables des qu'il y a plus d'une annonce, pour revenir en
//    arriere : c'est ce qui manque a la plupart des carrousels ;
//  - hauteur minimale fixe : le contenu de la page ne sursaute pas a chaque
//    changement de message.

const BANNIERE_FIELDS =
  "id,actif,texte_fr,texte_ar,lien_url,lien_label_fr,lien_label_ar," +
  "date_debut,date_fin,variante,priorite,date_updated";

const BANNIERE_QUERY =
  "/items/banniere" +
  "?filter[actif][_eq]=true" +
  "&sort=-priorite,-date_updated" +
  "&fields=" + BANNIERE_FIELDS +
  "&limit=5";

const BANNIERE_DELAI = 8000;

function dansLaFenetre(b) {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  if (b.date_debut) {
    const d = new Date(b.date_debut + "T00:00:00");
    if (!isNaN(d.getTime()) && d > now) return false;
  }
  if (b.date_fin) {
    const f = new Date(b.date_fin + "T23:59:59");
    if (!isNaN(f.getTime()) && f < now) return false;
  }
  return true;
}

function useBannieres(lang) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    let alive = true;
    fetch(CMS_URL + BANNIERE_QUERY, { headers: { Accept: "application/json" } })
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((j) => { if (alive) setItems(Array.isArray(j.data) ? j.data : []); })
      .catch(() => { /* pas de bandeau : le site fonctionne sans */ });
    return () => { alive = false; };
  }, []);

  return items.filter((b) => dansLaFenetre(b) && pickLang(b, "texte", lang));
}

function usePrefereMoinsAnimation() {
  const [reduit, setReduit] = React.useState(false);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const maj = () => setReduit(mq.matches);
    maj();
    if (mq.addEventListener) { mq.addEventListener("change", maj); return () => mq.removeEventListener("change", maj); }
  }, []);
  return reduit;
}

function Banniere({ t, lang }) {
  const items = useBannieres(lang);
  const reduit = usePrefereMoinsAnimation();
  const [idx, setIdx] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const [ferme, setFerme] = React.useState(false);

  // La memorisation de fermeture est indexee sur le contenu affiche :
  // une annonce ajoutee ou corrigee reapparait a tout le monde.
  const cle = items.length
    ? "echebbi_banniere_" + items.map((b) => b.id + ":" + (b.date_updated || "")).join("|")
    : null;

  React.useEffect(() => {
    if (!cle) return;
    try { setFerme(window.localStorage.getItem(cle) === "1"); } catch (e) { setFerme(false); }
  }, [cle]);

  React.useEffect(() => { setIdx(0); }, [items.length]);

  React.useEffect(() => {
    if (items.length < 2 || pause || reduit || ferme) return;
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % items.length),
      BANNIERE_DELAI
    );
    return () => window.clearInterval(id);
  }, [items.length, pause, reduit, ferme]);

  if (!items.length || ferme) return null;

  const b = items[Math.min(idx, items.length - 1)];
  const texte = pickLang(b, "texte", lang);
  const lienLabel = pickLang(b, "lien_label", lang);
  const rtl = t.dir === "rtl";

  const fermer = () => {
    setFerme(true);
    try { window.localStorage.setItem(cle, "1"); } catch (e) { /* navigation privee */ }
  };

  return (
    <div
      className={"banniere " + (b.variante === "important" ? "is-important" : "is-info")}
      role="region"
      aria-label={t.banniere.aria}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onFocusCapture={() => setPause(true)}
      onBlurCapture={() => setPause(false)}
    >
      <div className="container banniere-inner">
        <p className="banniere-texte" key={b.id}>{texte}</p>

        {b.lien_url && lienLabel && (
          <a className="banniere-lien" href={b.lien_url}>
            {lienLabel} <span aria-hidden="true">{rtl ? "←" : "→"}</span>
          </a>
        )}

        {items.length > 1 && (
          <div className="banniere-puces" role="group" aria-label={t.banniere.navigation}>
            {items.map((it, i) => (
              <button
                key={it.id}
                type="button"
                className={"banniere-puce" + (i === idx ? " est-active" : "")}
                aria-label={t.banniere.aller
                  .replace("{n}", String(i + 1))
                  .replace("{total}", String(items.length))}
                aria-current={i === idx ? "true" : undefined}
                onClick={() => { setIdx(i); setPause(true); }}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          className="banniere-fermer"
          onClick={fermer}
          aria-label={t.banniere.fermer}
          title={t.banniere.fermer}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}
