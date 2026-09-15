// sections.jsx — about, programs, numbers, admissions, news, agenda, cta, footer

const { useState: useStateS } = React;

function About({ t }) {
  return (
    <section className="section" id="about" data-screen-label="about">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow-row">
              <span className="eyebrow">{t.about.eyebrow}</span>
            </div>
            <h2>{t.about.title}</h2>
            <p>{t.about.lede}</p>
          </div>
        </Reveal>
        <div className="pillars">
          {t.about.pillars.map((p, i) => (
            <Reveal key={i} delay={i * 100} className="pillar-wrap">
              <div className="pillar">
                <div className="n">0{i + 1} / 04</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs({ t }) {
  return (
    <section className="section parchment" id="programs" data-screen-label="programs">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow-row">
              <span className="eyebrow">{t.programs.eyebrow}</span>
            </div>
            <h2>{t.programs.title}</h2>
            <p>{t.programs.lede}</p>
          </div>
        </Reveal>
        <div className="programs">
          <Reveal>
            <ProgramCard data={t.programs.college} more={t.programs.more} />
          </Reveal>
          <Reveal delay={150}>
            <ProgramCard data={t.programs.lycee} more={t.programs.more} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ data, more }) {
  return (
    <div className="program">
      <div className="level">{data.level}</div>
      <h3>{data.title}</h3>
      <div className="ages">{data.ages}</div>
      <ul>
        {data.items.map((it, i) => (
          <li key={i}>
            <span>{it.l}</span>
            <span className="tag">{it.t}</span>
          </li>
        ))}
      </ul>
      <a href="#" className="more">
        {more} <span className="arrow">→</span>
      </a>
    </div>
  );
}

function Numbers({ t }) {
  return (
    <section className="section navy" data-screen-label="numbers">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow-row">
              <span className="eyebrow" style={{ color: "var(--gold-400)" }}>{t.numbers.eyebrow}</span>
            </div>
            <h2>{t.numbers.title}</h2>
          </div>
        </Reveal>
        <div className="numbers">
          {t.numbers.stats.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="stat">
                <div className="big num">
                  {s.big}
                  {s.sup && <sup>{s.sup}</sup>}
                </div>
                <div className="lbl">{s.lbl}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Admissions({ t }) {
  const [open, setOpen] = useStateS(0);
  return (
    <section className="section" id="admissions" data-screen-label="admissions">
      <div className="container admissions">
        <div className="left">
          <Reveal>
            <div className="eyebrow-row">
              <span className="eyebrow">{t.admissions.eyebrow}</span>
            </div>
            <h2 style={{ fontSize: "clamp(30px, 3vw, 44px)", margin: "14px 0 18px", lineHeight: 1.1 }}>
              {t.admissions.title}
            </h2>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 18, color: "var(--mute)", lineHeight: 1.55, maxWidth: "38ch" }}>
              {t.admissions.lede}
            </p>
            <div className="deadline" style={{ marginTop: 24 }}>
              <span className="dot" />
              {t.admissions.deadline}
            </div>
          </Reveal>
        </div>
        <div className="right">
          <Reveal>
            <ul className="steps">
              {t.admissions.steps.map((s, i) => (
                <li
                  key={i}
                  className={"step " + (open === i ? "active" : "")}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <div className="n">0{i + 1}</div>
                  <div className="body">
                    <h4>{s.t}</h4>
                    <p>{s.s}</p>
                    <div className="detail">
                      <p>{s.d}</p>
                    </div>
                  </div>
                  <div className="chev">›</div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function News({ t }) {
  return (
    <section className="section parchment" id="news" data-screen-label="news">
      <div className="container">
        <Reveal>
          <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none" }}>
            <div style={{ maxWidth: 620 }}>
              <div className="eyebrow-row">
                <span className="eyebrow">{t.news.eyebrow}</span>
              </div>
              <h2>{t.news.title}</h2>
              <p>{t.news.lede}</p>
            </div>
          </div>
        </Reveal>
        <div className="news">
          {t.news.items.map((it, i) => (
            <Reveal key={i} delay={i * 120}>
              <article className="news-card">
                <div className="thumb">
                  <span className="badge">{it.badge}</span>
                  <span className="label">{it.img}</span>
                </div>
                <div className="body">
                  <div className="date">{it.date}</div>
                  <h4>{it.t}</h4>
                  <p>{it.p}</p>
                  <span className="read">
                    {t.news.more} <span className="arrow">→</span>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Agenda({ t }) {
  return (
    <section className="section" data-screen-label="agenda">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow-row">
              <span className="eyebrow">{t.agenda.eyebrow}</span>
            </div>
            <h2>{t.agenda.title}</h2>
          </div>
        </Reveal>
        <div className="agenda">
          {t.agenda.items.map((it, i) => (
            <div className="agenda-row" key={i}>
              <div className="date">
                <div className="d num">{it.d}</div>
                <div className="m">{it.m}</div>
              </div>
              <div className="body">
                <h4>{it.t}</h4>
                <p>{it.p}</p>
              </div>
              <div className="tag">{it.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner({ t }) {
  return (
    <section className="cta-banner" data-screen-label="cta">
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <h2>
            {t.cta.title1}
            <em>{t.cta.title2}</em>
            {t.cta.title3}
          </h2>
          <p>{t.cta.lede}</p>
          <div className="cta-row">
            <a href="#" className="btn gold">
              {t.cta.primary} <span className="arrow">→</span>
            </a>
            <a href="#" className="btn ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>
              {t.cta.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer id="contact" data-screen-label="footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img src="assets/crest.png" alt="" />
              <div>
                <div className="name">Abulkacem Echebbi</div>
                <div className="sub">{t.foot.tag}</div>
              </div>
            </div>
            <address className="foot-addr">
              {t.foot.addr.split("\\n").map((l, i) => (
                <div key={i}>{l}</div>
              ))}
              <div style={{ marginTop: 10 }} className="ltr-only">☏ {t.foot.phone}</div>
              <div>✉ {t.foot.email}</div>
            </address>
            <div style={{ marginTop: 22, fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold-400)", fontSize: 15 }}>
              {t.foot.motto}
            </div>
          </div>
          <div>
            <h5>{t.foot.explore}</h5>
            <ul>
              {t.foot.exploreLinks.map((l, i) => (
                <li key={i}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t.foot.practical}</h5>
            <ul>
              {t.foot.practicalLinks.map((l, i) => (
                <li key={i}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t.foot.legal}</h5>
            <ul>
              {t.foot.legalLinks.map((l, i) => (
                <li key={i}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>{t.foot.copyright}</span>
          <span style={{ fontFamily: "var(--mono)" }}>v.2026</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { About, Programs, Numbers, Admissions, News, Agenda, CtaBanner, Footer });
