import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');

  .footer-root {
    font-family: 'Space Grotesk', sans-serif;
    background: #000;
    position: relative;
    overflow: hidden;
  }

  /* Ambient glow orbs */
  .footer-root::before {
    content: '';
    position: absolute;
    width: 600px; height: 300px;
    background: radial-gradient(ellipse, rgba(255,195,0,0.08) 0%, transparent 70%);
    top: -80px; left: -100px;
    pointer-events: none;
    animation: driftLeft 8s ease-in-out infinite alternate;
  }
  .footer-root::after {
    content: '';
    position: absolute;
    width: 400px; height: 250px;
    background: radial-gradient(ellipse, rgba(255,122,0,0.06) 0%, transparent 70%);
    top: 0; right: 0;
    pointer-events: none;
    animation: driftRight 10s ease-in-out infinite alternate;
  }
  @keyframes driftLeft { from { transform: translateY(0) translateX(0); } to { transform: translateY(20px) translateX(30px); } }
  @keyframes driftRight { from { transform: translateY(0); } to { transform: translateY(-15px) translateX(-20px); } }

  /* Top accent line */
  .footer-topline {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,195,0,0.6) 20%, #FFC300 50%, rgba(255,122,0,0.6) 80%, transparent 100%);
    position: relative;
  }
  .footer-topline::after {
    content: '';
    position: absolute;
    top: -2px; left: 50%;
    transform: translateX(-50%);
    width: 120px; height: 5px;
    background: radial-gradient(ellipse, rgba(255,195,0,0.8) 0%, transparent 100%);
    filter: blur(3px);
  }

  /* Main glass panel */
  .footer-glass {
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-top: 1px solid rgba(255,195,0,0.08);
    border-bottom: 1px solid rgba(255,195,0,0.08);
    padding: 3rem 4rem 2rem;
    position: relative;
    z-index: 1;
  }

  /* Logo */
  .footer-logo-text {
    font-family: 'Rajdhani';
    font-weight: 700;
    font-size: 1.3rem;
    background: linear-gradient(135deg, #FFC300 0%, #FF7A00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.04em;
  }
  .footer-logo-dot {
    width: 8px; height: 8px;
    background: #4ade80;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 8px #4ade80, 0 0 16px rgba(74,222,128,0.4);
    animation: pulse-dot 2s ease-in-out infinite;
    margin-left: 6px;
    vertical-align: middle;
    position: relative;
    top: -2px;
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 6px #4ade80, 0 0 12px rgba(74,222,128,0.3); }
    50% { box-shadow: 0 0 12px #4ade80, 0 0 24px rgba(74,222,128,0.6); }
  }

  .footer-tagline {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.3);
    margin-top: 6px;
    letter-spacing: 0.04em;
    font-weight: 300;
  }

  /* Nav links */
  .footer-nav-link {
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    padding: 0.4rem 0.7rem;
    border-radius: 8px;
    transition: all 0.22s ease;
    position: relative;
    cursor: pointer;
    border: 1px solid transparent;
    background: transparent;
    font-family: 'Space Grotesk', sans-serif;
  }
  .footer-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 0; height: 1px;
    background: linear-gradient(90deg, #FFC300, #FF7A00);
    transition: width 0.25s ease;
  }
  .footer-nav-link:hover {
    color: #FFC300;
    background: rgba(255,195,0,0.06);
    border-color: rgba(255,195,0,0.18);
    box-shadow: 0 0 16px rgba(255,195,0,0.1);
  }
  .footer-nav-link:hover::after { width: 70%; }

  /* Social buttons */
  .social-btn {
    width: 40px; height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(255,195,0,0.18);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.22s ease;
    color: rgba(255,255,255,0.5);
  }
  .social-btn:hover {
    border-color: rgba(255,195,0,0.7);
    background: rgba(255,195,0,0.1);
    box-shadow: 0 0 20px rgba(255,195,0,0.2), inset 0 0 10px rgba(255,195,0,0.05);
    color: #FFC300;
    transform: translateY(-2px) scale(1.08);
  }

  /* Divider */
  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
    margin: 2rem 0 1.5rem;
  }

  /* Bottom bar */
  .footer-bottom-text {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.02em;
  }
  .footer-bottom-text span {
    color: rgba(255,195,0,0.65);
    font-weight: 500;
  }

  /* Status chip */
  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(74,222,128,0.08);
    border: 1px solid rgba(74,222,128,0.2);
    border-radius: 20px;
    padding: 0.25rem 0.75rem;
    font-size: 0.73rem;
    color: #4ade80;
    letter-spacing: 0.04em;
  }

  /* Bottom glow line */
  .footer-bottomline {
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,195,0,0.3) 30%, rgba(255,122,0,0.5) 60%, transparent);
  }

  /* Newsletter input */
  .nl-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,195,0,0.2);
    border-radius: 10px 0 0 10px;
    padding: 0.6rem 1rem;
    color: #fff;
    font-size: 0.83rem;
    font-family: 'Space Grotesk', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 200px;
  }
  .nl-input::placeholder { color: rgba(255,255,255,0.25); }
  .nl-input:focus {
    border-color: rgba(255,195,0,0.6);
    box-shadow: 0 0 0 3px rgba(255,195,0,0.08);
  }
  .nl-btn {
    background: linear-gradient(135deg, #FFC300, #FF7A00);
    border: none;
    border-radius: 0 10px 10px 0;
    padding: 0.6rem 1rem;
    color: #000;
    font-weight: 700;
    font-size: 0.82rem;
    font-family: 'Rajdhani';
    cursor: pointer;
    transition: opacity 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .nl-btn:hover {
    opacity: 0.9;
    box-shadow: 0 0 18px rgba(255,195,0,0.4);
  }

  .col-title {
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255,195,0,0.7);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .footer-link-small {
    display: block;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: color 0.18s, padding-left 0.18s;
    cursor: pointer;
  }
  .footer-link-small:hover {
    color: rgba(255,195,0,0.9);
    padding-left: 4px;
  }

  .badge {
    display: inline-block;
    background: rgba(255,195,0,0.12);
    border: 1px solid rgba(255,195,0,0.25);
    border-radius: 4px;
    padding: 0.1rem 0.45rem;
    font-size: 0.65rem;
    color: #FFC300;
    margin-left: 6px;
    vertical-align: middle;
    letter-spacing: 0.06em;
    font-weight: 600;
  }
`;

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); setTimeout(() => setSubscribed(false), 3000); setEmail(""); }
  };

  return (
    <>
      <style>{styles}</style>
      <footer className="footer-root">
        <div className="footer-topline" />

        <div className="footer-glass">
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            {/* Main grid */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "0" }}>

              {/* Brand column */}
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  <span className="footer-logo-text">Project Partner Finder</span>
                  <span className="footer-logo-dot" />
                </div>
                <p className="footer-tagline">
                  Connecting developers, designers<br />& innovators worldwide.
                </p>

                <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
                  <div className="status-chip">
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
                    All systems operational
                  </div>
                </div>

                {/* Newsletter */}
                <div>
                  <div className="col-title">Stay in the loop</div>
                  <div style={{ display: "flex" }}>
                    <input
                      className="nl-input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                    />
                    <button className="nl-btn" onClick={handleSubscribe}>
                      {subscribed ? "✓ Done!" : "Subscribe"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Platform */}
              <div>
                <div className="col-title">Platform</div>
                <a className="footer-link-small">Home</a>
                <a className="footer-link-small">Find Partner <span className="badge">HOT</span></a>
                <a className="footer-link-small">Live Projects</a>
                <a className="footer-link-small">Hackathons <span className="badge">NEW</span></a>
                <a className="footer-link-small">Leaderboard</a>
                <a className="footer-link-small">How It Works</a>
              </div>

              {/* Community */}
              <div>
                <div className="col-title">Community</div>
                <a className="footer-link-small">Discord Server</a>
                <a className="footer-link-small">GitHub Org</a>
                <a className="footer-link-small">Blog</a>
                <a className="footer-link-small">Open Source</a>
                <a className="footer-link-small">Contributors</a>
                <a className="footer-link-small">Changelog</a>
              </div>

              {/* Support */}
              <div>
                <div className="col-title">Support</div>
                <a className="footer-link-small">Documentation</a>
                <a className="footer-link-small">FAQ</a>
                <a className="footer-link-small">Contact Us</a>
                <a className="footer-link-small">Report a Bug</a>
                <a className="footer-link-small">Privacy Policy</a>
                <a className="footer-link-small">Terms of Service</a>
              </div>
            </div>

            <div className="footer-divider" />

            {/* Bottom bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>

              {/* Copyright */}
              <div className="footer-bottom-text">
                © 2026 <span>Project Partner Finder</span> · Built for developers, designers & innovators 🚀
              </div>

              {/* Center nav */}
              <div style={{ display: "flex", gap: "4px" }}>
                {["Home", "Find Partner", "Live Projects", "How It Works", "Support"].map(link => (
                  <button key={link} className="footer-nav-link">{link}</button>
                ))}
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="social-btn" title="LinkedIn"><LinkedInIcon /></button>
                <button className="social-btn" title="GitHub"><GitHubIcon /></button>
                <button className="social-btn" title="Twitter/X"><TwitterIcon /></button>
                <button className="social-btn" title="Discord"><DiscordIcon /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottomline" />
      </footer>
    </>
  );
}