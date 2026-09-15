// hero.jsx — hero with crest medallion + poet quote strip

function Hero({ t, variant }) {
  // variant: 'medallion' (crest featured right) | 'editorial' (crest inset, large type)
  if (variant === "editorial") return <HeroEditorial t={t} />;
  return <HeroMedallion t={t} />;
}

function HeroMedallion({ t }) {
  return (
    <>
      <section className="hero" id="top" data-screen-label="hero">
        <CornerFlourish position="tl" />
        <CornerFlourish position="tr" />
        <div className="container hero-grid">
          <div>
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--gold-400)", marginBottom: 22 }}>
                <Diamond size={6} color="var(--gold-500)" /> &nbsp; {t.hero.eyebrow}
              </div>
              <h1>
                {t.hero.title1}
                <em>{t.hero.title2}</em>
                {t.hero.title3}
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="lede">{t.hero.lede}</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="hero-meta">
                {t.hero.stats.map((s, i) => (
                  <div className="item" key={i}>
                    <div className="v num">{s.v}</div>
                    <div className="l">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={420}>
              <div className="hero-cta">
                <a href="#admissions" className="btn gold">
                  {t.hero.ctaPrimary} <span className="arrow">→</span>
                </a>
                <a href="#about" className="btn ghost">{t.hero.ctaSecondary}</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="hero-medallion">
              <div className="orbit" />
              <img src="assets/crest.png" alt="Armoiries Abulkacem Echebbi" />
            </div>
          </Reveal>
        </div>
      </section>
      <QuoteStrip t={t} />
    </>
  );
}

function HeroEditorial({ t }) {
  return (
    <>
      <section
        className="hero"
        id="top"
        data-screen-label="hero-editorial"
        style={{ minHeight: 620 }}
      >
        <CornerFlourish position="tl" />
        <CornerFlourish position="br" />
        <div
          className="container"
          style={{
            padding: "80px 40px 90px",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <img
            src="assets/crest.png"
            alt=""
            style={{ width: 140, height: 140, filter: "drop-shadow(0 12px 30px rgba(0,0,0,.35))" }}
          />
          <div>
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--gold-400)", marginBottom: 18 }}>
                {t.hero.eyebrow}
              </div>
              <h1 style={{ fontSize: "clamp(48px, 6vw, 92px)", maxWidth: "14ch" }}>
                {t.hero.title1}
                <em>{t.hero.title2}</em>
                {t.hero.title3}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="lede" style={{ marginTop: 28, maxWidth: "52ch" }}>
                {t.hero.lede}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="hero-cta" style={{ marginTop: 36 }}>
                <a href="#admissions" className="btn gold">
                  {t.hero.ctaPrimary} <span className="arrow">→</span>
                </a>
                <a href="#about" className="btn ghost">{t.hero.ctaSecondary}</a>
              </div>
            </Reveal>
          </div>
        </div>
        <div
          className="container"
          style={{
            borderTop: "1px solid rgba(201,162,75,.25)",
            paddingTop: 28,
            paddingBottom: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {t.hero.stats.map((s, i) => (
            <div key={i}>
              <div
                className="num"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 44,
                  color: "var(--gold-400)",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.55)",
                  marginTop: 10,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>
      <QuoteStrip t={t} />
    </>
  );
}

function QuoteStrip({ t }) {
  return (
    <div className="hero-quote">
      <div className="container hero-quote-inner">
        <span className="ornament">❧</span>
        <div style={{ flex: 1 }}>
          {t.hero.quote}
          <div className="attr" style={{ marginTop: 6 }}>— {t.hero.quoteAttr}</div>
        </div>
        <span className="ornament" style={{ transform: "scaleX(-1)" }}>❧</span>
      </div>
    </div>
  );
}

Object.assign(window, { Hero });
