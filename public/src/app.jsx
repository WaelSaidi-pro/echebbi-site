// app.jsx — root component, language state, tweaks bridge

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "medallion",
  "accent": "gold",
  "bg": "paper",
  "density": "airy"
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("echebbi_lang") || "fr");
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  // Apply lang to <html> & <body>
  useEffect(() => {
    const t = I18N[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.body.classList.remove("lang-fr", "lang-ar", "lang-en");
    document.body.classList.add("lang-" + lang);
    localStorage.setItem("echebbi_lang", lang);
  }, [lang]);

  // Apply tweaks live
  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  // Tweaks protocol
  useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setTweaksVisible(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  const t = I18N[lang];

  return (
    <>
      <TopBar t={t} lang={lang} setLang={setLang} />
      <MainNav t={t} />
      <Hero t={t} variant={tweaks.hero} />
      <About t={t} />
      <Founder t={t} />
      <Programs t={t} />
      <Numbers t={t} />
      <Admissions t={t} />
      <News t={t} lang={lang} />
      <Agenda t={t} />
      <CtaBanner t={t} />
      <Footer t={t} />
      <TweaksPanel visible={tweaksVisible} values={tweaks} setValue={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
