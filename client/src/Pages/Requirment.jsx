import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    background: #000;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    color: #fff;
  }

  .app-bg {
    min-height: 100vh;
    background: #000;
    background-image:
      radial-gradient(ellipse 80% 50% at 20% 20%, rgba(255,195,0,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,122,0,0.05) 0%, transparent 60%);
    padding: 2rem 1rem 4rem;
  }

  .glass {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,195,0,0.18);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 20px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #FFC300, #FF7A00);
    color: #000;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.75rem;
    cursor: pointer;
    font-size: 0.95rem;
    transition: transform 0.18s, box-shadow 0.18s;
    letter-spacing: 0.01em;
  }
  .btn-primary:hover {
    transform: scale(1.04);
    box-shadow: 0 0 22px rgba(255,195,0,0.45);
  }
  .btn-primary:active { transform: scale(0.98); }

  .btn-back {
    background: none;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 10px;
    padding: 0.5rem 1.1rem;
    color: rgba(255,255,255,0.5);
    font-size: 0.82rem;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.2s, color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-back:hover {
    border-color: rgba(255,195,0,0.4);
    color: #FFC300;
  }

  .selector-btn {
    background: rgba(255,255,255,0.03);
    border: 1.5px solid rgba(255,195,0,0.3);
    border-radius: 18px;
    padding: 2rem 2.5rem;
    cursor: pointer;
    text-align: left;
    color: #fff;
    width: 100%;
    backdrop-filter: blur(12px);
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .selector-btn:hover {
    border-color: #FFC300;
    box-shadow: 0 0 36px rgba(255,195,0,0.22);
    background: rgba(255,195,0,0.06);
  }

  .input-field {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,195,0,0.18);
    border-radius: 10px;
    padding: 0.7rem 1rem;
    color: #fff;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-field::placeholder { color: rgba(255,255,255,0.3); }
  .input-field:focus {
    border-color: rgba(255,195,0,0.7);
    box-shadow: 0 0 0 3px rgba(255,195,0,0.1);
  }
  select.input-field option { background: #111; color: #fff; }
  textarea.input-field { resize: vertical; min-height: 80px; }

  .label {
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255,195,0,0.8);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 0.4rem;
    display: block;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,195,0,0.12);
    border: 1px solid rgba(255,195,0,0.35);
    border-radius: 20px;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    color: #FFC300;
    cursor: default;
  }
  .tag-remove {
    background: none;
    border: none;
    color: rgba(255,195,0,0.6);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    transition: color 0.15s;
  }
  .tag-remove:hover { color: #FF7A00; }

  .github-box {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 1.25rem;
    margin-bottom: 1.1rem;
  }
  .github-prefix {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,195,0,0.25);
    border-radius: 10px;
    overflow: hidden;
  }
  .github-prefix span {
    padding: 0.7rem 0.9rem;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.35);
    border-right: 1px solid rgba(255,195,0,0.12);
  }
  .github-prefix input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 0.7rem 1rem;
    color: #fff;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    outline: none;
  }
  .github-prefix input::placeholder { color: rgba(255,255,255,0.3); }

  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,195,0,0.25), transparent);
    margin: 1.5rem 0;
  }
  .section-header {
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.85rem;
  }

  .fade-in {
    animation: fadeSlideIn 0.45s ease both;
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .selector-enter {
    animation: fadeSlideIn 0.45s ease both;
  }

  .match-bar-track {
    height: 6px;
    background: rgba(255,255,255,0.08);
    border-radius: 99px;
    overflow: hidden;
    flex: 1;
  }
  .match-bar-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #FFC300, #FF7A00);
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,195,0,0.3); border-radius: 4px; }
`;

function TagInput({ tags, setTags, placeholder }) {
  const [input, setInput] = useState("");
  const add = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) setTags([...tags, input.trim()]);
      setInput("");
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: tags.length ? "8px" : 0 }}>
        {tags.map(t => (
          <span key={t} className="tag">
            {t}
            <button className="tag-remove" onClick={() => setTags(tags.filter(x => x !== t))}>×</button>
          </span>
        ))}
      </div>
      <input className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyDown={add} placeholder={placeholder || "Type and press Enter"} />
    </div>
  );
}

function RepoTagInput({ tags, setTags }) {
  const [input, setInput] = useState("");
  const add = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) setTags([...tags, input.trim()]);
      setInput("");
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: tags.length ? "8px" : 0 }}>
        {tags.map(t => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "0.25rem 0.75rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" style={{ flexShrink: 0 }}>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {t.replace("https://github.com/", "")}
            <button className="tag-remove" onClick={() => setTags(tags.filter(x => x !== t))}>×</button>
          </span>
        ))}
      </div>
      <input className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyDown={add} placeholder="https://github.com/you/repo — press Enter" />
    </div>
  );
}

function FormField({ label, children, hint }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label className="label">{label}</label>
      {hint && <div style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.3)", marginBottom: "6px" }}>{hint}</div>}
      {children}
    </div>
  );
}

function GitHubSection({ profileUsername, setProfileUsername, repoLinks, setRepoLinks }) {
  return (
    <div className="github-box">
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,195,0,0.85)">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,195,0,0.9)" }}>GitHub</span>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginLeft: 2 }}>Helps teammates verify your skills</span>
      </div>
      <FormField label="GitHub Profile Username">
        <div className="github-prefix">
          <span>github.com/</span>
          <input value={profileUsername} onChange={e => setProfileUsername(e.target.value)} placeholder="yourusername" />
        </div>
      </FormField>
      <FormField label="Past Hackathon / Project Repos" hint="Paste repo URLs from your previous work — press Enter after each">
        <RepoTagInput tags={repoLinks} setTags={setRepoLinks} />
      </FormField>
    </div>
  );
}

function HackathonForm({ onSubmit, onBack }) {
  const [f, setF] = useState({ title: "", problem: "", idea: "", stack: [], category: "", githubUsername: "", githubRepos: [] });
  const up = (k, v) => setF(prev => ({ ...prev, [k]: v }));
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="glass" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,195,0,0.1)", border: "1px solid rgba(255,195,0,0.25)", borderRadius: "20px", padding: "0.25rem 0.8rem", fontSize: "0.75rem", color: "#FFC300", marginBottom: "0.6rem" }}>
              ⚡ Hackathon
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFC300", marginBottom: "4px" }}>Hackathon Requirements</div>
            <div style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.4)" }}>Fill in the details to find your perfect team</div>
          </div>
          <button className="btn-back" onClick={onBack}>← Change</button>
        </div>
        <div className="section-header">Basic Info</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <FormField label="Hackathon Name">
            <input className="input-field" placeholder="e.g. HackMIT 2025" value={f.title} onChange={e => up("title", e.target.value)} />
          </FormField>
          <FormField label="Problem Category">
            <select className="input-field" value={f.category} onChange={e => up("category", e.target.value)}>
              <option value="">Select category</option>
              {["AI / ML", "Web3 / Blockchain", "IoT / Hardware", "HealthTech", "FinTech", "EdTech", "Climate", "Open"].map(c => <option key={c}>{c}</option>)}
            </select>
          </FormField>
        </div>
        <FormField label="Problem Statement / Theme">
          <textarea className="input-field" placeholder="Describe the problem you're solving..." value={f.problem} onChange={e => up("problem", e.target.value)} />
        </FormField>
        <FormField label="Your Project Idea">
          <textarea className="input-field" placeholder="What are you building?" value={f.idea} onChange={e => up("idea", e.target.value)} />
        </FormField>
        <div className="section-divider" />
        <div className="section-header">Tech Stack</div>
        <FormField label="Tech Stack">
          <TagInput tags={f.stack} setTags={v => up("stack", v)} placeholder="e.g. React, Python, Solidity — press Enter" />
        </FormField>
        <div className="section-divider" />
        <div className="section-header">Your GitHub</div>
        <GitHubSection profileUsername={f.githubUsername} setProfileUsername={v => up("githubUsername", v)} repoLinks={f.githubRepos} setRepoLinks={v => up("githubRepos", v)} />
        <div className="section-divider" />
        <button className="btn-primary" style={{ width: "100%" }} onClick={() => onSubmit(f)}>Post Hackathon Requirement →</button>
      </div>
    </div>
  );
}

function ProjectForm({ onSubmit, onBack }) {
  const [f, setF] = useState({ title: "", desc: "", stack: [], type: "", status: "", githubUsername: "", githubRepos: [] });
  const up = (k, v) => setF(prev => ({ ...prev, [k]: v }));
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="glass" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,195,0,0.1)", border: "1px solid rgba(255,195,0,0.25)", borderRadius: "20px", padding: "0.25rem 0.8rem", fontSize: "0.75rem", color: "#FFC300", marginBottom: "0.6rem" }}>
              🚀 Project
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFC300", marginBottom: "4px" }}>Project Requirements</div>
            <div style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.4)" }}>Describe your project and find the right collaborators</div>
          </div>
          <button className="btn-back" onClick={onBack}>← Change</button>
        </div>
        <div className="section-header">Basic Info</div>
        <FormField label="Project Title">
          <input className="input-field" placeholder="e.g. AI-Powered Resume Builder" value={f.title} onChange={e => up("title", e.target.value)} />
        </FormField>
        <FormField label="Project Description">
          <textarea className="input-field" style={{ minHeight: "100px" }} placeholder="What is your project about? What problem does it solve?" value={f.desc} onChange={e => up("desc", e.target.value)} />
        </FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <FormField label="Project Type">
            <select className="input-field" value={f.type} onChange={e => up("type", e.target.value)}>
              <option value="">Select type</option>
              {["Web App", "Mobile App", "AI / ML", "Blockchain", "Desktop App", "API / Backend", "Open Source", "Research"].map(x => <option key={x}>{x}</option>)}
            </select>
          </FormField>
          <FormField label="Project Status">
            <select className="input-field" value={f.status} onChange={e => up("status", e.target.value)}>
              <option value="">Select status</option>
              {["Idea Phase", "In Progress", "Beta", "Completed", "Looking for Contributors"].map(x => <option key={x}>{x}</option>)}
            </select>
          </FormField>
        </div>
        <div className="section-divider" />
        <div className="section-header">Tech Stack</div>
        <FormField label="Tech Stack">
          <TagInput tags={f.stack} setTags={v => up("stack", v)} placeholder="e.g. Next.js, FastAPI, PostgreSQL — press Enter" />
        </FormField>
        <div className="section-divider" />
        <div className="section-header">Your GitHub</div>
        <GitHubSection profileUsername={f.githubUsername} setProfileUsername={v => up("githubUsername", v)} repoLinks={f.githubRepos} setRepoLinks={v => up("githubRepos", v)} />
        <div className="section-divider" />
        <button className="btn-primary" style={{ width: "100%" }} onClick={() => onSubmit(f)}>Post Project Requirement →</button>
      </div>
    </div>
  );
}

function SuccessState({ type, onReset }) {
  return (
    <div className="glass fade-in" style={{ padding: "3rem 2rem", textAlign: "center", maxWidth: "520px", margin: "0 auto" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
      <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#FFC300", marginBottom: "0.5rem" }}>Requirement Posted!</div>
      <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
        Your {type === "hackathon" ? "hackathon" : "project"} requirement is live. Matching collaborators will be notified.
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "2rem" }}>
        <div className="match-bar-track" style={{ maxWidth: "200px" }}>
          <div className="match-bar-fill" style={{ width: "100%" }} />
        </div>
        <span style={{ fontSize: "0.85rem", color: "#FFC300" }}>Going live...</span>
      </div>
      <button className="btn-primary" onClick={onReset}>Post Another Requirement</button>
    </div>
  );
}

export default function Requirement2() {
  const [activeMode, setActiveMode] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (mode) => setActiveMode(mode);
  const handleBack = () => setActiveMode(null);
  const handleReset = () => { setActiveMode(null); setSubmitted(false); };

  return (
    <>
      <style>{styles}</style>
      <div className="app-bg">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header — always visible unless submitted */}
          {!submitted && (
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,195,0,0.08)", border: "1px solid rgba(255,195,0,0.2)", borderRadius: "20px", padding: "0.35rem 1rem", fontSize: "0.78rem", color: "#FFC300", marginBottom: "1.2rem", letterSpacing: "0.08em" }}>
                ⚡ COLLAB PLATFORM
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg, #FFC300, #FF7A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                Find Your Dream Team
              </h1>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
                Post your requirement and get matched with the right people — fast.
              </p>
            </div>
          )}

          {/* STEP 1 — Selector cards (only when no mode chosen yet) */}
          {!activeMode && !submitted && (
            <div
              className="selector-enter"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}
            >
              {[
                { id: "hackathon", icon: "⚡", title: "Find Partner for Hackathon", desc: "Build a dream team for your next hackathon challenge" },
                { id: "project",   icon: "🚀", title: "Find Partner for Project",   desc: "Collaborate on side projects, startups & open source" },
              ].map(opt => (
                <button
                  key={opt.id}
                  className="selector-btn"
                  onClick={() => handleSelect(opt.id)}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{opt.icon}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>{opt.title}</div>
                  <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — Form (selector completely gone) */}
          {activeMode && !submitted && (
            <div style={{ animation: "slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}>
              {activeMode === "hackathon" && <HackathonForm onSubmit={() => setSubmitted(true)} onBack={handleBack} />}
              {activeMode === "project"   && <ProjectForm   onSubmit={() => setSubmitted(true)} onBack={handleBack} />}
            </div>
          )}

          {/* STEP 3 — Success */}
          {submitted && (
            <SuccessState type={activeMode} onReset={handleReset} />
          )}

        </div>
      </div>
    </>
  );
}