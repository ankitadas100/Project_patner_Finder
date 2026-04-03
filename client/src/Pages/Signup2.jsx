import { useState, useEffect, useRef } from "react";
import { handleError } from "../Components/ErrorMessage";
import { Eye, EyeOff, Camera } from 'lucide-react'; // Added Camera icon
import { useEmail } from "../context/UserEmailContext";
import { useNavigate } from "react-router";
import axios from "axios"
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
        placeholder={value.length === 0 ? "Add skills — press Enter or comma , Like - c++, Java," : ""}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKey}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); if (inputVal.trim()) addTags(inputVal); }}
      />
    </div>
  );
}

export default function Signup2() {
  const [form, setForm] = useState({
    profilePic: "", // Added to state for the upload preview
    fullName: "", email: "", password: "", repass: "", github: "",
    linkedin: "", portfolio: "", college: "",
    about: "", skills: [],
  });

  const { email } = useEmail();
  const [errors, setErrors] = useState({});
  const [Image,setImage]=useState(null)
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const naviget = useNavigate();

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Handle Image Upload Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0])
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.profilePic) e.profilePic = "Upload profile pic"
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!email) e.email = "Email is required";
    if (form.github && !/^https?:\/\/(www\.)?github\.com\/.+/.test(form.github))
      e.github = "Enter a valid GitHub URL";
    if (form.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(form.linkedin))
      e.linkedin = "Enter a valid LinkedIn URL";
    if (!form.college.trim()) e.college = "College name is required";
    if (form.skills.length === 0) e.skills = "Add at least one skill";
    if (!form.password) {
      e.password = "Password is required";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters long";
    }

    if (!form.repass) {
      e.repass = "Please re-enter your password";
    } else if (form.password !== form.repass) {
      e.repass = "Passwords do not match";
    }
    setErrors(e);
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    console.log(form);
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`;
      const formdata = new FormData();
      if (form.profilePic) {
        formdata.append("profilepic", Image);
      }
      const useralldata = ({
        fullname: form.fullName,
        password: form.password,
        email: email,
        collagename: form.college,
        bio: form.about,
        skill: form.skills,
        githublink: form.github,
        linkedinlink: form.linkedin,
        protfolio: form.portfolio
      })
      formdata.append("userinfo", JSON.stringify(useralldata))
      const res = await axios.post(url, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // const responce = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({

      //     // Note: form.profilePic is available here if your backend needs it!
      //   })
      // });
  
      console.log(res.data)
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => { return naviget("/login"); }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      return handleError("Internal Server Error!");
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="wrap">
        <div className="grid-bg" />
        {/* <BubbleCanvas /> */}

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
                <p className="s-title">Profile created ✅!</p>
              </div>
            )}

            <form className="fg" onSubmit={handleSubmit} noValidate>

              {/* Profile Image Upload Section */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                <div style={{ position: "relative", width: "100px", height: "100px" }}>
                  <label
                    htmlFor="profile-upload"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "2px dashed #FFC300",
                      backgroundColor: "rgba(255,195,0,0.05)",
                      overflow: "hidden",
                      transition: "all 0.2s ease-in-out"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,195,0,0.15)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,195,0,0.05)"}
                  >
                    {form.profilePic ? (
                      <img
                        src={form.profilePic}
                        alt="Profile Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <Camera color="#FFC300" size={32} style={{ opacity: 0.8 }} />
                    )}
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  {/* Small plus icon badge */}
                  {!form.profilePic && (
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      background: "#FFC300",
                      color: "#000",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      boxShadow: "0 0 10px rgba(255,195,0,.6)",
                      pointerEvents: "none"
                    }}>
                      +
                    </div>
                  )}
                  {errors.profilePic && <span className="err">⚠ {errors.profilePic}</span>}
                </div>
              </div>

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
                    value={email} readOnly />
                  {errors.email && <span className="err">⚠ {errors.email}</span>}
                </div>
              </div>

              <div className="divider" />
              <div className="form-row">
                <div className="fl">
                  <label className="form-label">Password</label>
                  <div style={{ position: "relative", display: "flex" }}>
                    <input className="form-input" type={showPassword ? "text" : "password"} placeholder="••••••••"
                      value={form.password} onChange={set("password")} />
                    <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className="err">⚠ {errors.password}</span>}
                </div>
                <div className="fl">
                  <label className="form-label">Renter Password</label>
                  <div style={{ position: "relative", display: "flex" }}>
                    <input className="form-input" type={showRepass ? "text" : "password"} placeholder="••••••••"
                      value={form.repass} onChange={set("repass")} />
                    <button type="button" className="password-toggle-btn" onClick={() => setShowRepass(!showRepass)}>
                      {showRepass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.repass && <span className="err">⚠ {errors.repass}</span>}
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