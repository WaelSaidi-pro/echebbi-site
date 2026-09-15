// founder.jsx — editorial tribute to the founder, Mme Fatma Ezzahra Benmbarek

function Founder({ t }) {
  const f = t.founder;
  return (
    <section className="founder" id="founder" data-screen-label="founder">
      <div className="container founder-inner">
        <Reveal>
          <div className="founder-head">
            <div>
              <div className="eyebrow">{f.eyebrow}</div>
              <div className="kicker" style={{ marginTop: 6 }}>{f.kicker}</div>
            </div>
            <div className="rule" />
          </div>
        </Reveal>

        <div className="founder-grid">
          <Reveal>
            <aside className="founder-portrait">
              <div className="frame">
                <img src="assets/founder.jpg" alt={f.name} />
              </div>
              <div className="name-plate">
                <div className="name">{f.name}</div>
                <div className="role">{f.kicker}</div>
                <div className="presence"><span className="live" /> {f.presence}</div>
              </div>
            </aside>
          </Reveal>

          <div className="founder-body">
            <Reveal delay={120}>
              <h2>{f.title}</h2>
              <p className="lede">{f.lede}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="paras">
                {f.bodyParas.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <p className="founder-today">{f.today}</p>
            </Reveal>
            <Reveal delay={320}>
              <blockquote className="founder-pullquote">
                {f.pullQuote}
              </blockquote>
            </Reveal>
            <Reveal delay={380}>
              <ul className="founder-values">
                {f.values.map((v, i) => (
                  <li key={i}>
                    <span className="k">{v.k}</span>
                    <span className="d">{v.d}</span>
                    <span className="n">0{i + 1} / 0{f.values.length}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="founder-timeline">
            {f.timeline.map((it, i) => (
              <div className="tl-item" key={i}>
                <div className="dot" />
                <div className="y num">{it.y}</div>
                <div className="t">{it.t}</div>
                <div className="d">{it.d}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="founder-slogan">
            {t.foot.motto === f.title ? f.title : "« " + f.title + " »"}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Founder });
