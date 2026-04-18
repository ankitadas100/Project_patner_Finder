import React, { useState } from "react";
import "../styles/requirment.css"
import { useAuth } from "../context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import { handleError, handleSuccess } from "../Components/ErrorMessage";

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
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
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
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
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

function HackathonForm({ onSubmit, onBack, isSubmitting }) {
  const [f, setF] = useState({ title: "", problem: "", idea: "", usestack: [], needstack: [], category: "", hackthonlink: "" });
  const [error, setError] = useState("");

  const up = (k, v) => {
    setF(prev => ({ ...prev, [k]: v }));
    if (error) setError(""); // Clear error on typing
  };

  const handleSubmit = () => {
    if (!f.title.trim()) return setError("Hackathon Name is required.");
    if (!f.category) return setError("Please select a Problem Category.");
    if (!f.problem.trim()) return setError("Problem Statement / Theme is required.");
    if (!f.idea.trim()) return setError("Your Project Idea is required.");
    if (f.usestack.length === 0) return setError("Please add at least one Tech Stack.");
    if (f.needstack.length === 0) return setError("Please add at least one Required Skill.");

    onSubmit(f);
  };

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
          <button className="btn-back" onClick={onBack} disabled={isSubmitting}>← Change</button>
        </div>
        <div className="section-header">Basic Info</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <FormField label="Hackathon Name">
            <input className="input-field" placeholder="e.g. HackMIT 2025" value={f.title} onChange={e => up("title", e.target.value)} disabled={isSubmitting} />
          </FormField>
          <FormField label="Problem Category">
            <select className="input-field" value={f.category} onChange={e => up("category", e.target.value)} disabled={isSubmitting}>
              <option value="">Select category</option>
              {["AI / ML", "Web3 / Blockchain", "IoT / Hardware", "HealthTech", "FinTech", "EdTech", "Climate", "Open"].map(c => <option key={c}>{c}</option>)}
            </select>
          </FormField>
        </div>
        <FormField label="Problem Statement / Theme">
          <textarea className="input-field" placeholder="Describe the problem you're solving..." value={f.problem} onChange={e => up("problem", e.target.value)} disabled={isSubmitting} />
        </FormField>
        <FormField label="Your Project Idea">
          <textarea className="input-field" placeholder="What are you building?" value={f.idea} onChange={e => up("idea", e.target.value)} disabled={isSubmitting} />
        </FormField>
        <FormField label="Hackthon website link / devfolio link (Optional)">
          <input className="input-field" placeholder="https://example.com" value={f.hackthonlink} onChange={e => up("hackthonlink", e.target.value)} disabled={isSubmitting} />
        </FormField>
        <div className="section-divider" />
        <div className="section-header">All the tech stack that use in this project</div>
        <FormField label="Tech Stack">
          <TagInput tags={f.usestack} setTags={v => up("usestack", v)} placeholder="e.g. React, Python, Solidity — press Enter" disabled={isSubmitting} />
        </FormField>
        <div className="section-divider" />
        <div className="section-header">Required Skills for this project</div>
        <FormField label="Skills">
          <TagInput tags={f.needstack} setTags={v => up("needstack", v)} placeholder="e.g. React, Python, Solidity — press Enter" disabled={isSubmitting} />
        </FormField>

        {error && (
          <div className="error-message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}

        <button
          className="btn-primary"
          style={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting Requirement..." : "Post Hackathon Requirement →"}
        </button>
      </div>
    </div>
  );
}

function ProjectForm({ onSubmit, onBack, isSubmitting }) {
  const [f, setF] = useState({ title: "", desc: "", usestack: [], needstack: [], type: "", status: "", githubRepo: "" });
  const [error, setError] = useState("");

  const up = (k, v) => {
    setF(prev => ({ ...prev, [k]: v }));
    if (error) setError(""); // Clear error on typing
  };

  const handleSubmit = () => {
    if (!f.title.trim()) return setError("Project Title is required.");
    if (!f.desc.trim()) return setError("Project Description is required.");
    if (!f.type) return setError("Please select a Project Type.");
    if (!f.status) return setError("Please select a Project Status.");
    if (f.usestack.length === 0) return setError("Please add at least one Tech Stack.");
    if (f.needstack.length === 0) return setError("Please add at least one Required Skill.");

    // Form is valid! Submit data.
    onSubmit(f);
  };

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
          <button className="btn-back" onClick={onBack} disabled={isSubmitting}>← Change</button>
        </div>
        <div className="section-header">Basic Info</div>
        <FormField label="Project Title">
          <input className="input-field" placeholder="e.g. AI-Powered Resume Builder" value={f.title} onChange={e => up("title", e.target.value)} disabled={isSubmitting} />
        </FormField>
        <FormField label="Project Description">
          <textarea className="input-field" style={{ minHeight: "100px" }} placeholder="What is your project about? What problem does it solve?" value={f.desc} onChange={e => up("desc", e.target.value)} disabled={isSubmitting} />
        </FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <FormField label="Project Type">
            <select className="input-field" value={f.type} onChange={e => up("type", e.target.value)} disabled={isSubmitting}>
              <option value="">Select type</option>
              {["Web App", "Mobile App", "AI / ML", "Blockchain", "Desktop App", "API / Backend", "Open Source", "Research"].map(x => <option key={x}>{x}</option>)}
            </select>
          </FormField>
          <FormField label="Project Status">
            <select className="input-field" value={f.status} onChange={e => up("status", e.target.value)} disabled={isSubmitting}>
              <option value="">Select status</option>
              {["Idea Phase", "In Progress", "Beta", "Completed", "Looking for Contributors"].map(x => <option key={x}>{x}</option>)}
            </select>
          </FormField>
        </div>
        <div className="section-divider" />
        <div className="section-header">All the tech stack used in this project</div>
        <FormField label="Tech Stack">
          <TagInput tags={f.usestack} setTags={v => up("usestack", v)} placeholder="e.g. Next.js, FastAPI, PostgreSQL — press Enter" disabled={isSubmitting} />
        </FormField>
        <div className="section-divider" />
        <div className="section-header">Skills Needed</div>
        <FormField label="Skill">
          <TagInput tags={f.needstack} setTags={v => up("needstack", v)} placeholder="e.g. UI/UX, React Native — press Enter" disabled={isSubmitting} />
        </FormField>
        <div className="section-divider" />

        {f.status !== "" && f.status !== "Idea Phase" && (
          <>
            <div className="section-header">GitHub Repositories of the project</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,195,0,0.85)">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,195,0,0.9)" }}>GitHub</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginLeft: 2 }}>If you have the github Repositories pest here </span>
            </div>

            <FormField label="Repositories Link (Optional)">
              <input className="input-field" placeholder="https://github.com/skrijwan100/LandChain" value={f.githubRepo} onChange={e => up("githubRepo", e.target.value)} disabled={isSubmitting} />
            </FormField>
          </>
        )}

        {error && (
          <div className="error-message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}

        <button
          className="btn-primary"
          style={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting Requirement..." : "Post Project Requirement →"}
        </button>
      </div>
    </div>
  );
}

function SuccessState({ type, onReset }) {
  return (
    <div className="glass fade-in" style={{ padding: "3rem 2rem", textAlign: "center", maxWidth: "520px", margin: "100px auto" }}>
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

export default function Requirment() {
  const [activeMode, setActiveMode] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth()
  const handleSelect = (mode) => setActiveMode(mode);
  const handleBack = () => setActiveMode(null);

  const handleReset = () => {
    setActiveMode(null);
    setSubmitted(false);
    setIsSubmitting(false);
  };

  // 📡 Simulated API Call Function
  const handlePostRequirement = async (type, formData) => {
    setIsSubmitting(true);

    // Log the collected data to the console as requested
    console.log(`--- POSTING ${type.toUpperCase()} REQUIREMENT ---`);
    console.log(JSON.stringify(formData, null, 2));
    console.log(formData)
    const token = await user?.getIdToken();
    const localtoken = secureLocalStorage.getItem('auth-token');
    try {
      if (localtoken) {
        if (type.toLocaleLowerCase() === 'hackathon') {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/add-hackthon-reqirment`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localtoken
            },
            body: JSON.stringify({ hackthonName: formData.title, hackthonProblemCategory: formData.category, hackthonProblemStatement: formData.problem, hackthonProjectIdea: formData.idea, hackthonWebsiteLink: formData.hackthonlink, AllTechStack: formData.usestack, RequiredSkills: formData.needstack })
          });
          const data = await responce.json()
          if (data.status) {
            setSubmitted(true);
            window.scrollTo({
              top: 0,
              behavior: 'smooth', // Adds a nice animation
            });
            return handleSuccess("Requirment has been added.")
          }
        }
        if (type.toLocaleLowerCase() === 'project') {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/add-project-requirment`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localtoken
            },
            body: JSON.stringify({ ProjectTitle: formData.title, ProjectDescription: formData.desc, ProjectType: formData.type, ProjectStatus: formData.status, AllTechStack: formData.usestack, RequiredSkills: formData.needstack, ProjectRepoLink: formData.githubRepo})
          });
          const data = await responce.json()
          if (data.status) {
            setSubmitted(true);
            window.scrollTo({
              top: 0,
              behavior: 'smooth', // Adds a nice animation
            });
            return handleSuccess("Requirment has been added.")
          }
        }
      }
      if (token) {
        if (type.toLocaleLowerCase() === 'hackathon') {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/add-hackthon-reqirment`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ hackthonName: formData.title, hackthonProblemCategory: formData.category, hackthonProblemStatement: formData.problem, hackthonProjectIdea: formData.idea, hackthonWebsiteLink: formData.hackthonlink, AllTechStack: formData.usestack, RequiredSkills: formData.needstack })
          });
          const data = await responce.json()
          if (data.status) {
            setSubmitted(true);
            window.scrollTo({
              top: 0,
              behavior: 'smooth', // Adds a nice animation
            });
            return handleSuccess("Requirment has been added.")
          }
        }
        if (type.toLocaleLowerCase() === 'project') {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/add-project-requirment`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ProjectTitle: formData.title, ProjectDescription: formData.desc, ProjectType: formData.type, ProjectStatus: formData.status, AllTechStack: formData.usestack, RequiredSkills: formData.needstack, ProjectRepoLink: formData.githubRepo})
          });
          const data = await responce.json()
          if (data.status) {
            setSubmitted(true);
            window.scrollTo({
              top: 0,
              behavior: 'smooth', // Adds a nice animation
            });
            return handleSuccess("Requirment has been added.")
          }
        }

      }
    } catch (error) {
      return handleError("Check your Internet")
      console.error("❌ Error posting requirement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                { id: "project", icon: "🚀", title: "Find Partner for Project", desc: "Collaborate on side projects, startups & open source" },
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
              {activeMode === "hackathon" && (
                <HackathonForm
                  onSubmit={(data) => handlePostRequirement("hackathon", data)}
                  onBack={handleBack}
                  isSubmitting={isSubmitting}
                />
              )}
              {activeMode === "project" && (
                <ProjectForm
                  onSubmit={(data) => handlePostRequirement("project", data)}
                  onBack={handleBack}
                  isSubmitting={isSubmitting}
                />
              )}
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