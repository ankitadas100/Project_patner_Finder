import React, { useRef } from "react";

const skills = [
  {
    name: "React",
    tag: "Frontend",
    bg: "rgba(97,218,251,0.12)",
    border: "rgba(97,218,251,0.25)",
    iconColor: "#61DAFB",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={34}>
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" />
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(120 20 20)" />
        <circle cx="20" cy="20" r="2.8" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: "UI/UX Design",
    tag: "Design",
    bg: "rgba(255,120,180,0.1)",
    border: "rgba(255,120,180,0.25)",
    iconColor: "#FF78B4",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={34}>
        <rect x="6" y="6" width="12" height="12" rx="3" fill="rgba(255,120,180,0.25)" stroke="#FF78B4" strokeWidth="1.6" />
        <rect x="22" y="6" width="12" height="12" rx="6" fill="rgba(255,120,180,0.25)" stroke="#FF78B4" strokeWidth="1.6" />
        <rect x="6" y="22" width="12" height="12" rx="6" fill="rgba(255,120,180,0.15)" stroke="#FF78B4" strokeWidth="1.6" strokeDasharray="3 2" />
        <rect x="22" y="22" width="12" height="12" rx="3" fill="rgba(255,120,180,0.25)" stroke="#FF78B4" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    tag: "Backend",
    bg: "rgba(104,216,93,0.1)",
    border: "rgba(104,216,93,0.25)",
    iconColor: "#68D85D",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={34}>
        <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="#68D85D" strokeWidth="1.8" fill="rgba(104,216,93,0.1)" />
        <path d="M20 13V20L26 23.5" stroke="#68D85D" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2" fill="#68D85D" />
      </svg>
    ),
  },
  {
    name: "Python",
    tag: "Language",
    bg: "rgba(255,195,0,0.1)",
    border: "rgba(255,195,0,0.25)",
    iconColor: "#FFC300",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={34}>
        <path d="M20 6C13.5 6 14 8.7 14 11v3h12v2H12s-6 0-6 8 5 8 5 8h4v-3.5S14.5 32 20 32s5.5-3.5 5.5-3.5H28s5 0 5-8-6-7-6-7H14v-2h12v-2C26 8.7 26.5 6 20 6Z" fill="rgba(255,195,0,0.15)" stroke="#FFC300" strokeWidth="1.5" />
        <circle cx="17" cy="10" r="1.5" fill="#FFC300" />
        <circle cx="23" cy="30" r="1.5" fill="#FFC300" />
      </svg>
    ),
  },
  {
    name: "AI / ML",
    tag: "Intelligence",
    bg: "rgba(155,100,255,0.1)",
    border: "rgba(155,100,255,0.25)",
    iconColor: "#9B64FF",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={34}>
        <circle cx="20" cy="20" r="5" fill="rgba(155,100,255,0.25)" stroke="#9B64FF" strokeWidth="1.8" />
        <circle cx="8" cy="12" r="2.5" fill="rgba(155,100,255,0.2)" stroke="#9B64FF" strokeWidth="1.4" />
        <circle cx="32" cy="12" r="2.5" fill="rgba(155,100,255,0.2)" stroke="#9B64FF" strokeWidth="1.4" />
        <circle cx="8" cy="28" r="2.5" fill="rgba(155,100,255,0.2)" stroke="#9B64FF" strokeWidth="1.4" />
        <circle cx="32" cy="28" r="2.5" fill="rgba(155,100,255,0.2)" stroke="#9B64FF" strokeWidth="1.4" />
        <line x1="15" y1="17" x2="10" y2="14" stroke="#9B64FF" strokeWidth="1.2" opacity="0.7" />
        <line x1="25" y1="17" x2="30" y2="14" stroke="#9B64FF" strokeWidth="1.2" opacity="0.7" />
        <line x1="15" y1="23" x2="10" y2="26" stroke="#9B64FF" strokeWidth="1.2" opacity="0.7" />
        <line x1="25" y1="23" x2="30" y2="26" stroke="#9B64FF" strokeWidth="1.2" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Mobile Dev",
    tag: "Cross-Platform",
    bg: "rgba(0,200,255,0.1)",
    border: "rgba(0,200,255,0.25)",
    iconColor: "#00C8FF",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={34}>
        <rect x="13" y="4" width="14" height="32" rx="3" fill="rgba(0,200,255,0.1)" stroke="#00C8FF" strokeWidth="1.8" />
        <line x1="17" y1="9" x2="23" y2="9" stroke="#00C8FF" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="20" cy="31" r="1.5" fill="#00C8FF" />
        <rect x="16" y="14" width="8" height="12" rx="1.5" fill="rgba(0,200,255,0.15)" stroke="#00C8FF" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "Blockchain",
    tag: "Web3",
    bg: "rgba(255,165,0,0.1)",
    border: "rgba(255,165,0,0.25)",
    iconColor: "#FFA500",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={34} height={34}>
        <rect x="4" y="15" width="10" height="10" rx="2" fill="rgba(255,165,0,0.15)" stroke="#FFA500" strokeWidth="1.6" />
        <rect x="15" y="8" width="10" height="10" rx="2" fill="rgba(255,165,0,0.15)" stroke="#FFA500" strokeWidth="1.6" />
        <rect x="15" y="22" width="10" height="10" rx="2" fill="rgba(255,165,0,0.15)" stroke="#FFA500" strokeWidth="1.6" />
        <rect x="26" y="15" width="10" height="10" rx="2" fill="rgba(255,165,0,0.15)" stroke="#FFA500" strokeWidth="1.6" />
        <line x1="14" y1="20" x2="15" y2="20" stroke="#FFA500" strokeWidth="1.4" />
        <line x1="20" y1="18" x2="20" y2="22" stroke="#FFA500" strokeWidth="1.4" />
        <line x1="25" y1="20" x2="26" y2="20" stroke="#FFA500" strokeWidth="1.4" />
        <line x1="20" y1="14" x2="20" y2="15" stroke="#FFA500" strokeWidth="1.4" />
        <line x1="20" y1="25" x2="20" y2="26" stroke="#FFA500" strokeWidth="1.4" />
      </svg>
    ),
  },
];

const particles = [
  { x: 15, y: 20, size: 3, delay: 0 },
  { x: 75, y: 70, size: 2, delay: 1.5 },
  { x: 45, y: 10, size: 4, delay: 3 },
  { x: 90, y: 40, size: 2, delay: 0.8 },
  { x: 30, y: 80, size: 3, delay: 2.2 },
  { x: 60, y: 55, size: 2, delay: 4 },
  { x: 8,  y: 60, size: 3, delay: 1 },
  { x: 85, y: 85, size: 2, delay: 3.5 },
];

const doubled = [...skills, ...skills];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');

  .df-root {
    background: #000;

    padding: 80px 0;
    overflow: hidden;
    position: relative;
    min-height: 420px;
  }

  .df-particle {
    position: absolute;
    border-radius: 50%;
    background: #FFC300;
    opacity: 0;
    animation: dfParticleFade 6s infinite ease-in-out;
  }

  @keyframes dfParticleFade {
    0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
    50% { opacity: 0.18; transform: translateY(-30px) scale(1.3); }
  }

  .df-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,195,0,0.08);
    border: 1px solid rgba(255,195,0,0.25);
    color: #FFC300;
    font-family: 'Rajdhani', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 20px;
  }

  .df-label-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #FFC300;
    animation: dfPulse 1.8s infinite;
  }

  @keyframes dfPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,195,0,0.5); }
    50% { opacity: 0.7; box-shadow: 0 0 0 5px rgba(255,195,0,0); }
  }

  .df-fade-left {
    position: absolute;
    top: 0; bottom: 0; left: 0;
    width: 120px;
    background: linear-gradient(to right, #000, transparent);
    z-index: 10;
    pointer-events: none;
  }

  .df-fade-right {
    position: absolute;
    top: 0; bottom: 0; right: 0;
    width: 120px;
    background: linear-gradient(to left, #000, transparent);
    z-index: 10;
    pointer-events: none;
  }

  .df-track {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: dfScroll 28s linear infinite;
  }

  .df-track-outer:hover .df-track {
    animation-play-state: paused;
  }

  @keyframes dfScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .df-card {
    flex-shrink: 0;
    width: 180px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px;
    padding: 28px 20px 24px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(.23,1,.32,1),
                border-color 0.35s ease,
                box-shadow 0.35s ease,
                background 0.35s ease;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
  }

  .df-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255,195,0,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .df-card:hover::before { opacity: 1; }

  .df-card:hover {
    transform: translateY(-10px) scale(1.03);
    border-color: rgba(255,195,0,0.55);
    box-shadow: 0 0 28px rgba(255,195,0,0.18),
                0 0 6px rgba(255,195,0,0.1),
                0 20px 40px rgba(0,0,0,0.5);
    background: rgba(255,195,0,0.06);
  }

  .df-icon-wrap {
    width: 70px;
    height: 70px;
    border-radius: 18px;
    margin: 0 auto 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.35s ease;
  }

  .df-card:hover .df-icon-wrap {
    box-shadow: 0 0 20px rgba(255,195,0,0.25);
  }

  .df-skill-name {
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
    letter-spacing: 0.01em;
  }

  .df-skill-tag {
    font-size: 11px;
    color: rgba(255,195,0,0.6);
    font-weight: 400;
    letter-spacing: 0.05em;
  }

  .df-glow-ring {
    position: absolute;
    inset: -1px;
    border-radius: 21px;
    border: 1px solid transparent;
    background: linear-gradient(135deg, rgba(255,195,0,0.5), transparent 60%) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  .df-card:hover .df-glow-ring { opacity: 1; }
`;

export default function PopularSkills() {
  return (
    <>
      <style>{css}</style>

      <section className="df-root">

        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {particles.map((p, i) => (
            <div
              key={i}
              className="df-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52, position: "relative", zIndex: 2, padding: "0 24px" }}>
          <div className="df-label">
            <span className="df-label-dot" />
            DevForge Platform
          </div>
          <h2
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Popular{" "}
            <span style={{ color: "#FFC300" }}>Skills</span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 15,
              fontWeight: 300,
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Explore the most in-demand skills and find the right partners for your project.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="df-fade-left" />
          <div className="df-fade-right" />
          <div className="df-track-outer" style={{ overflow: "hidden", padding: "24px 0 32px" }}>
            <div className="df-track">
              {doubled.map((skill, i) => (
                <div className="df-card" key={i}>
                  <div className="df-glow-ring" />
                  <div
                    className="df-icon-wrap"
                    style={{ background: skill.bg }}
                  >
                    {skill.icon}
                  </div>
                  <div className="df-skill-name">{skill.name}</div>
                  <div className="df-skill-tag">{skill.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}