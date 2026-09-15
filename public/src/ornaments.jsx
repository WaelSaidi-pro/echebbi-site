// ornaments.jsx — small decorative SVGs used throughout

const { useState, useEffect, useRef } = React;

function LaurelLeft({ className = "", width = 120 }) {
  return (
    <svg className={className} viewBox="0 0 60 140" width={width} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M 30 5 Q 30 70 30 135" />
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 15 + i * 14;
          return (
            <g key={i}>
              <path d={`M 30 ${y} Q 12 ${y + 4} 4 ${y + 12}`} />
              <path d={`M 30 ${y} Q 48 ${y + 4} 56 ${y + 12}`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function Diamond({ size = 8, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={color} />
    </svg>
  );
}

// Corner flourish for the navy hero/CTA sections
function CornerFlourish({ position = "tl", size = 160 }) {
  const t = {
    tl: { top: 24, left: 24, transform: "rotate(0deg)" },
    tr: { top: 24, right: 24, transform: "scaleX(-1)" },
    bl: { bottom: 24, left: 24, transform: "scaleY(-1)" },
    br: { bottom: 24, right: 24, transform: "scale(-1, -1)" },
  }[position];
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ position: "absolute", color: "var(--gold-500)", opacity: 0.4, pointerEvents: "none", ...t }}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        <path d="M 5 5 L 50 5" />
        <path d="M 5 5 L 5 50" />
        <path d="M 5 5 L 20 20" strokeWidth="0.4" />
        <circle cx="5" cy="5" r="2" fill="currentColor" />
        <path d="M 12 5 C 18 5 18 12 24 12" />
        <path d="M 5 12 C 5 18 12 18 12 24" />
      </g>
    </svg>
  );
}

// Scroll-triggered fade-in wrapper
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .8s ease, transform .8s cubic-bezier(.2,.7,.1,1)",
      }}
    >
      {children}
    </div>
  );
}

Object.assign(window, { LaurelLeft, Diamond, CornerFlourish, Reveal });
