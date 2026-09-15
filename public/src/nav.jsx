// nav.jsx — topbar + main nav + language toggle

function TopBar({ t, lang, setLang }) {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div>
          <span className="ltr-only">☏ {t.top.contact}</span>
          <span className="sep ltr-only">|</span>
          <span>{t.top.address}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="#portal" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {t.top.portal} ↗
          </a>
          <div className="lang-toggle" data-screen-label="lang-toggle">
            {["fr", "ar", "en"].map((l) => (
              <button
                key={l}
                className={lang === l ? "active" : ""}
                onClick={() => setLang(l)}
                aria-label={`Switch to ${l}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MainNav({ t }) {
  return (
    <nav className="nav" data-screen-label="main-nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <img src="assets/crest.png" alt="" className="brand-crest" />
          <div className="brand-text">
            <div className="name">Abulkacem Echebbi</div>
            <div className="sub">Collège &middot; Lycée &middot; 1991</div>
          </div>
        </a>
        <div className="nav-links">
          <a href="#about">{t.nav.about}</a>
          <a href="#founder">{t.nav.founder}</a>
          <a href="#programs">{t.nav.programs}</a>
          <a href="#admissions">{t.nav.admissions}</a>
          <a href="#news">{t.nav.news}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <a href="#admissions" className="btn gold">
          {t.nav.apply} <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}

Object.assign(window, { TopBar, MainNav });
