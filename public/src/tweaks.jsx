// tweaks.jsx — in-design Tweaks panel (hero variant, accent hue, density, palette)

const { useState: useStateT, useEffect: useEffectT } = React;

function TweaksPanel({ visible, values, setValue }) {
  if (!visible) return null;
  return (
    <div className="tweaks-panel" data-screen-label="tweaks">
      <header>
        <span>Tweaks</span>
        <span style={{ opacity: 0.6 }}>◆</span>
      </header>
      <div className="body">
        <Row label="Hero layout">
          <Opt on={values.hero === "medallion"} onClick={() => setValue("hero", "medallion")}>Medallion</Opt>
          <Opt on={values.hero === "editorial"} onClick={() => setValue("hero", "editorial")}>Editorial</Opt>
        </Row>
        <Row label="Accent">
          <Opt on={values.accent === "gold"} onClick={() => setValue("accent", "gold")}>Gold</Opt>
          <Opt on={values.accent === "terracotta"} onClick={() => setValue("accent", "terracotta")}>Terracotta</Opt>
          <Opt on={values.accent === "olive"} onClick={() => setValue("accent", "olive")}>Olive</Opt>
        </Row>
        <Row label="Background tone">
          <Opt on={values.bg === "paper"} onClick={() => setValue("bg", "paper")}>Paper</Opt>
          <Opt on={values.bg === "parchment"} onClick={() => setValue("bg", "parchment")}>Parchment</Opt>
          <Opt on={values.bg === "ivory"} onClick={() => setValue("bg", "ivory")}>Ivory</Opt>
        </Row>
        <Row label="Density">
          <Opt on={values.density === "airy"} onClick={() => setValue("density", "airy")}>Airy</Opt>
          <Opt on={values.density === "compact"} onClick={() => setValue("density", "compact")}>Compact</Opt>
        </Row>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="row">
      <label>{label}</label>
      <div className="opts">{children}</div>
    </div>
  );
}

function Opt({ on, onClick, children }) {
  return (
    <button className={on ? "active" : ""} onClick={onClick}>
      {children}
    </button>
  );
}

// Apply tweak values to :root CSS vars + body classes
function applyTweaks(v) {
  const root = document.documentElement.style;
  const accents = {
    gold:       { g600: "#A8832F", g500: "#C9A24B", g400: "#D9B972", g200: "#EAD9A8" },
    terracotta: { g600: "#A0522D", g500: "#C17050", g400: "#D5957A", g200: "#EDC8B7" },
    olive:      { g600: "#6F7A2B", g500: "#8C9838", g400: "#A8B462", g200: "#D4DBA8" },
  }[v.accent] || {};
  if (accents.g600) {
    root.setProperty("--gold-600", accents.g600);
    root.setProperty("--gold-500", accents.g500);
    root.setProperty("--gold-400", accents.g400);
    root.setProperty("--gold-200", accents.g200);
  }
  const bg = { paper: "#FBF9F3", parchment: "#F7F2E8", ivory: "#FDFBF4" }[v.bg];
  if (bg) root.setProperty("--paper", bg);
  const parch = { paper: "#F2ECDC", parchment: "#EEE6D2", ivory: "#F4EFE0" }[v.bg];
  if (parch) root.setProperty("--parchment", parch);

  document.body.classList.toggle("compact", v.density === "compact");
}

Object.assign(window, { TweaksPanel, applyTweaks });
