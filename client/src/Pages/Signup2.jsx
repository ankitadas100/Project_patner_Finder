import { useState, useEffect, useRef } from "react";

const globalStyles = `
  
`;

// ── Bubble Canvas ─────────────────────────────────────────────────────────────
function BubbleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let bubbles = [];
    let W, H, animId;

    const resize = () => {
      const p = canvas.parentElement;
      W = canvas.width = p.offsetWidth;
      H = canvas.height = p.offsetHeight || window.innerHeight;
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    const makeBubble = () => ({
      x: rand(0, W), y: H + rand(0, H),
      r: rand(2, 7), speed: rand(0.3, 1.1),
      drift: rand(-0.25, 0.25),
      alpha: rand(0.06, 0.28),
      pulse: rand(0, Math.PI * 2),
      ps: rand(0.008, 0.025),
    });

    const init = () => {
      resize();
      bubbles = Array.from({ length: 90 }, () => {
        const b = makeBubble();
        b.y = rand(0, H);
        return b;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      bubbles.forEach((b, i) => {
        b.pulse += b.ps;
        const pr = b.r + Math.sin(b.pulse) * 0.6;
        const pa = b.alpha + Math.sin(b.pulse) * 0.04;

        ctx.beginPath();
        ctx.arc(b.x, b.y, pr, 0, Math.PI * 2);

        if (b.r > 4.5) {
          ctx.strokeStyle = `rgba(255,195,0,${pa * 1.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.fillStyle = `rgba(255,195,0,${pa * 0.35})`;
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${pa * 0.7})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.fillStyle = `rgba(255,255,255,${pa * 0.15})`;
        }
        ctx.fill();

        b.y -= b.speed;
        b.x += b.drift;

        if (b.y < -b.r * 2) {
          const nb = makeBubble();
          nb.y = H + nb.r;
          bubbles[i] = nb;
        }
      });
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="bubble-canvas" ref={canvasRef} />;
}

// ── Skills Tag Input ──────────────────────────────────────────────────────────
function SkillsInput({ value, onChange }) {
  const [inputVal, setInputVal] = useState("");
  const [focused, setFocused] = useState(false);

  const addTags = (raw) => {
    const parts = raw.split(",").map((t) => t.trim()).filter(Boolean);
    const next = [...new Set([...value, ...parts])];
    onChange(next);
    setInputVal("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputVal.trim()) addTags(inputVal);
    } else if (e.key === "Backspace" && !inputVal && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div
      className={`tag-wrap${focused ? " focused" : ""}`}
      onClick={(e) => e.currentTarget.querySelector("input").focus()}
    >
      {value.map((tag, i) => (
        <span key={i} className="chip">
          {tag}
          <button className="chip-x" type="button" onClick={() => removeTag(i)}>×</button>
        </span>
      ))}
      <input
        className="tag-input-inner"
        value={inputVal}
        placeholder={value.length === 0 ? "Add skills — press Enter or comma" : ""}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKey}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); if (inputVal.trim()) addTags(inputVal); }}
      />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Signup2() {
  const [form, setForm] = useState({
    fullName: "", email: "", github: "",
    linkedin: "", portfolio: "", college: "",
    about: "", skills: [],
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.github && !/^https?:\/\/(www\.)?github\.com\/.+/.test(form.github))
      e.github = "Enter a valid GitHub URL";
    if (form.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(form.linkedin))
      e.linkedin = "Enter a valid LinkedIn URL";
    if (!form.college.trim()) e.college = "College name is required";
    if (form.skills.length === 0) e.skills = "Add at least one skill";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="wrap">
        <div className="grid-bg" />
        <BubbleCanvas />

        <div className="inner">
          {/* Header */}
          <div className="hd">
            <div className="badge">
              <div className="dot-y" />
              {/* <span className="badge-txt">Developer Onboarding</span> */}
              <div className="dot-y" />
            </div>
            <h1 className="page-title">
              Build Your <span>Profile</span>
            </h1>
            <p className="sub">Step 2 of 3 — Tell us about yourself</p>
            <div className="steps">
              <div className="sd" style={{ width: 8, background: "rgba(255,195,0,.4)" }} />
              <div className="sd" style={{ width: 24, background: "#FFC300", boxShadow: "0 0 10px rgba(255,195,0,.6)" }} />
              <div className="sd" style={{ width: 8, background: "rgba(255,255,255,.15)" }} />
            </div>
          </div>

          {/* Card */}
          <div className="card">
            <div className="ca ca-tl" />
            <div className="ca ca-br" />

            {submitted && (
              <div className="success-overlay">
                <div className="ring">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                    stroke="#FFC300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="s-title">Profile Submitted!</p>
                <p className="s-sub">We'll review and get back to you soon</p>
              </div>
            )}

            <form className="fg" onSubmit={handleSubmit} noValidate>
              {/* Row 1 */}
              <div className="form-row">
                <div className="fl">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" type="text" placeholder="John Doe"
                    value={form.fullName} onChange={set("fullName")} />
                  {errors.fullName && <span className="err">⚠ {errors.fullName}</span>}
                </div>
                <div className="fl">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="you@example.com"
                    value={form.email} onChange={set("email")} />
                  {errors.email && <span className="err">⚠ {errors.email}</span>}
                </div>
              </div>

              <div className="divider" />

              {/* Row 2 */}
              <div className="form-row">
                <div className="fl">
                  <label className="form-label">GitHub Profile</label>
                  <input className="form-input" type="url" placeholder="https://github.com/username"
                    value={form.github} onChange={set("github")} />
                  {errors.github && <span className="err">⚠ {errors.github}</span>}
                </div>
                <div className="fl">
                  <label className="form-label">LinkedIn Profile</label>
                  <input className="form-input" type="url" placeholder="https://linkedin.com/in/username"
                    value={form.linkedin} onChange={set("linkedin")} />
                  {errors.linkedin && <span className="err">⚠ {errors.linkedin}</span>}
                </div>
              </div>

              {/* Row 3 */}
              <div className="form-row">
                <div className="fl">
                  <label className="form-label">Portfolio Link</label>
                  <input className="form-input" type="url" placeholder="https://yourportfolio.dev"
                    value={form.portfolio} onChange={set("portfolio")} />
                </div>
                <div className="fl">
                  <label className="form-label">College Name</label>
                  <input className="form-input" type="text" placeholder="MIT, Stanford…"
                    value={form.college} onChange={set("college")} />
                  {errors.college && <span className="err">⚠ {errors.college}</span>}
                </div>
              </div>

              <div className="divider" />

              {/* About */}
              <div className="fl">
                <label className="form-label">About Yourself</label>
                <textarea className="form-input form-textarea"
                  placeholder="Tell us what drives you, your projects, goals, or anything that sets you apart…"
                  value={form.about} onChange={set("about")} />
              </div>

              {/* Skills */}
              <div className="fl">
                <label className="form-label">Skills</label>
                <SkillsInput
                  value={form.skills}
                  onChange={(skills) => setForm((p) => ({ ...p, skills }))}
                />
                {errors.skills && <span className="err">⚠ {errors.skills}</span>}
              </div>

              {/* Submit */}
              <div className="btn-row">
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Processing…" : "Submit Profile →"}
                </button>
              </div>

              <p className="note">
                Your data is encrypted and never shared with third parties
              </p>
            </form>
          </div>

          <p className="foot">© 2026 DevPlatform — All rights reserved</p>
        </div>
      </div>
    </>
  );
}