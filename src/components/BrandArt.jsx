// BrandArt.jsx — real photography wired in.
// All four uploaded assets are now used directly.

export function HeroImage({ className = "" }) {
  return (
    <img
      src="/hero.jpg"
      alt="Himalayan mountain village at golden hour, Kangra Valley"
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
    />
  );
}

export function HoneyJarImage({ className = "", variant = "default" }) {
  return (
    <img
      src="/product-honey.jpg"
      alt="GHARRAT Raw Himalayan Honey jar"
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
    />
  );
}

export function MillImage({ className = "" }) {
  return (
    <img
      src="/mill.jpg"
      alt="Traditional Himalayan water mill (Gharat) beside a mountain stream"
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
    />
  );
}

export function MillWheel({ className = "", size = 220, spinning = false }) {
  return (
    <svg
      className={className}
      style={spinning ? { animation: "millSpin 40s linear infinite" } : undefined}
      width={size}
      height={size}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GHARRAT mill wheel mark"
    >
      <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <circle cx="120" cy="120" r="86" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <circle cx="120" cy="120" r="10" fill="currentColor" opacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 120 + 18 * Math.cos(angle);
        const y1 = 120 + 18 * Math.sin(angle);
        const x2 = 120 + 108 * Math.cos(angle);
        const y2 = 120 + 108 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" opacity="0.4" />;
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 120 + 100 * Math.cos(angle);
        const y = 120 + 100 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="4" fill="currentColor" opacity="0.55" />;
      })}
    </svg>
  );
}

export function TextureCard({ className = "", tone = "stone" }) {
  const tones = {
    stone: ["#EDE5D4", "#DCD0B5"],
    moss:  ["#8E9A82", "#5C6652"],
    dusk:  ["#2C3830", "#1F2A24"],
    honey: ["#E8B768", "#C8862B"],
  };
  const [a, b] = tones[tone] || tones.stone;
  return (
    <svg className={className} viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`tex-${tone}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#tex-${tone})`} />
      <g opacity="0.12">
        <path d="M0 380 Q100 340 200 370 T400 350" fill="none" stroke="#1F2A24" strokeWidth="2" />
        <path d="M0 420 Q100 380 200 410 T400 390" fill="none" stroke="#1F2A24" strokeWidth="2" />
        <path d="M0 460 Q100 420 200 450 T400 430" fill="none" stroke="#1F2A24" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function PortraitPlaceholder({ className = "", seed = 1 }) {
  const hues = ["#C8862B", "#5C6652", "#8E9A82", "#A8650F"];
  const tone = hues[seed % hues.length];
  return (
    <svg className={className} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="400" height="400" fill="#EDE5D4" />
      <circle cx="200" cy="160" r="80" fill={tone} opacity="0.55" />
      <path d="M60 400 Q200 260 340 400 Z" fill={tone} opacity="0.75" />
    </svg>
  );
}
