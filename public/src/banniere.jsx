// banniere.jsx — bandeau d'annonce en tete de page, alimente par le CMS.
// Reutilise CMS_URL et pickLang definis dans actualites.jsx : ce fichier doit
// donc etre charge APRES lui dans index.html.
//
// Choix d'ergonomie :
//  - le bandeau est dans le flux normal, au-dessus de la barre de navigation
//    collante : il est vu a l'arrivee puis disparait au defilement, sans jamais
//    recouvrir le menu ni voler de la hauteur d'ecran en lecture ;
//  - il se ferme, et le choix du visiteur est memorise ;
//  - la memorisation est indexee sur la date de modification : une nouvelle
//    annonce, ou une annonce corrigee, reapparait a tout le monde ;
//  - une fenetre de dates le fait disparaitre tout seul. Un bandeau qu'il faut
//    penser a retirer finit toujours par rester.

const BANNIERE_FIELDS =
  "actif,texte_fr,texte_ar,lien_url,lien_label_fr,lien_label_ar," +
  "date_debut,date_fin,variante,date_updated";

function useBanniere() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let alive = true;
    fetch(CMS_URL + "/items/banniere?fields=" + BANNIERE_FIELDS,
          { headers: { Accept: "application/json" } })
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((j) => { if (alive) setData(j.data || null); })
      .catch(() => { /* pas de bandeau : le site fonctionne sans */ });
    return () => { alive = false; };
  }, []);

  return data;
}

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

function Banniere({ t, lang }) {
  const b = useBanniere();
  const [ferme, setFerme] = React.useState(false);

  const cle = b ? "echebbi_banniere_" + (b.date_updated || "init") : null;

  React.useEffect(() => {
    if (!cle) return;
    try { setFerme(window.localStorage.getItem(cle) === "1"); } catch (e) { setFerme(false); }
  }, [cle]);

  if (!b || !b.actif || !dansLaFenetre(b)) return null;

  const texte = pickLang(b, "texte", lang);
  if (!texte) return null;
  if (ferme) return null;

  const lienLabel = pickLang(b, "lien_label", lang);
  const rtl = t.dir === "rtl";

  const fermer = () => {
    setFerme(true);
    try { window.localStorage.setItem(cle, "1"); } catch (e) { /* mode prive */ }
  };

  return (
    <div
      className={"banniere " + (b.variante === "important" ? "is-important" : "is-info")}
      role="region"
      aria-label={t.banniere.aria}
    >
      <div className="container banniere-inner">
        <p className="banniere-texte">{texte}</p>

        {b.lien_url && lienLabel && (
          <a className="banniere-lien" href={b.lien_url}>
            {lienLabel} <span aria-hidden="true">{rtl ? "←" : "→"}</span>
          </a>
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
