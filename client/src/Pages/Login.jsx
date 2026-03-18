import React, { useState, useEffect } from 'react'
import './Login.css'
// Inject Rajdhani font + custom styles
const GlobalStyles = () => (
  <style>{`
  
  `}</style>
)

// Particles background
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${8 + Math.random() * 10}s`,
    size: Math.random() > 0.6 ? '3px' : '2px',
    opacity: 0.3 + Math.random() * 0.5,
  }))

  return (
    <>
      {particles.map(p => (
        <span key={p.id} className="particle" style={{
          left: p.left, bottom: '-4px',
          width: p.size, height: p.size,
          animationDelay: p.delay,
          animationDuration: p.duration,
          opacity: p.opacity,
        }} />
      ))}
    </>
  )
}

// Eye icons
const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"/>
  </svg>
)

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.4, flexShrink:0}}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.4, flexShrink:0}}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const SkillsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.4, flexShrink:0}}>
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [shakeField, setShakeField] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '', password: '', github: '', linkedin: '', skills: ''
  })

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Min 6 characters'
    if (form.github && !/^https?:\/\/(www\.)?github\.com\/.+/.test(form.github)) errs.github = 'Invalid GitHub URL'
    if (form.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(form.linkedin)) errs.linkedin = 'Invalid LinkedIn URL'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      const first = Object.keys(errs)[0]
      setShakeField(first)
      setTimeout(() => setShakeField(null), 500)
      return
    }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    alert('Login successful! Welcome back, developer.')
  }

  return (
    <>
      <GlobalStyles />
      <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', fontFamily: "'Rajdhani', sans-serif" }}>

        {/* Background */}
        <div className="hero-bg-grad" />
        <div className="grid-lines" />
        <Particles />

        {/* Card */}
        <div className="glass-card fade-up" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', borderRadius: '20px', overflow: 'hidden' }}>

          {/* Top accent */}
          <div className="accent-bar" />

          <div style={{ padding: '24px 48px 28px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ marginBottom: '14px' }}>
                <span className="dev-badge">
                  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#FFC300"/></svg>
                  Developer Platform
                </span>
              </div>
              <h1 className="logo-glow" style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FFC300', lineHeight: 1 }}>
                DEV<span style={{ color: '#fff' }}>GATE</span>
              </h1>
              <p style={{ marginTop: '8px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                Access your workspace
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Email */}
              <div>
                <div className={`input-group ${shakeField === 'email' ? 'shake' : ''}`}>
                  <input
                    type="email" id="email" placeholder=" "
                    value={form.email} onChange={update('email')}
                    style={{ paddingRight: '16px' }}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
                {errors.email && <p style={{ marginTop: '5px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,90,90,0.85)', paddingLeft: '4px' }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className={`input-group ${shakeField === 'password' ? 'shake' : ''}`}>
                  <input
                    type={showPassword ? 'text' : 'password'} id="password" placeholder=" "
                    value={form.password} onChange={update('password')}
                    style={{ paddingRight: '48px' }}
                  />
                  <label htmlFor="password">Password</label>
                  <button type="button" className="pw-toggle" onClick={() => setShowPassword(v => !v)} aria-label="Toggle password">
                    {showPassword ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
                {errors.password && <p style={{ marginTop: '5px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,90,90,0.85)', paddingLeft: '4px' }}>{errors.password}</p>}
                <div style={{ textAlign: 'right', marginTop: '6px' }}>
                  <a href="#" className="link-yellow" style={{ fontSize: '12px', letterSpacing: '0.06em' }}>Forgot Password?</a>
                </div>
              </div>

              {/* Divider */}
              <div className="divider" style={{ margin: '2px 0' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>Profile Links</span>
              </div>

              {/* GitHub */}
              <div>
                <div className={`input-group ${shakeField === 'github' ? 'shake' : ''}`} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
                    <GithubIcon />
                  </div>
                  <input
                    type="url" id="github" placeholder=" "
                    value={form.github} onChange={update('github')}
                    style={{ paddingLeft: '38px' }}
                  />
                  <label htmlFor="github" style={{ left: '38px' }}>GitHub Profile URL</label>
                </div>
                {errors.github && <p style={{ marginTop: '5px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,90,90,0.85)', paddingLeft: '4px' }}>{errors.github}</p>}
              </div>

              {/* LinkedIn */}
              <div>
                <div className={`input-group ${shakeField === 'linkedin' ? 'shake' : ''}`}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
                    <LinkedInIcon />
                  </div>
                  <input
                    type="url" id="linkedin" placeholder=" "
                    value={form.linkedin} onChange={update('linkedin')}
                    style={{ paddingLeft: '38px' }}
                  />
                  <label htmlFor="linkedin" style={{ left: '38px' }}>LinkedIn Profile URL</label>
                </div>
                {errors.linkedin && <p style={{ marginTop: '5px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,90,90,0.85)', paddingLeft: '4px' }}>{errors.linkedin}</p>}
              </div>

              {/* Skills */}
              <div>
                <div className="input-group">
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
                    <SkillsIcon />
                  </div>
                  <input
                    type="text" id="skills" placeholder=" "
                    value={form.skills} onChange={update('skills')}
                    style={{ paddingLeft: '38px' }}
                  />
                  <label htmlFor="skills" style={{ left: '38px' }}>Skills (comma-separated)</label>
                </div>
                {form.skills && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {form.skills.split(',').map(s => s.trim()).filter(Boolean).map((skill, i) => (
                      <span key={i} style={{
                        background: 'rgba(255,195,0,0.08)',
                        border: '1px solid rgba(255,195,0,0.2)',
                        borderRadius: '6px', padding: '2px 10px',
                        fontSize: '11px', fontWeight: 600,
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: 'rgba(255,195,0,0.75)'
                      }}>{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="login-btn" style={{ marginTop: '6px' }} disabled={loading}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Authenticating...
                    <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    Access Workspace
                  </span>
                )}
              </button>

            </form>

            {/* Footer */}
            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.25)' }}>
              Don't have an account?{' '}
              <a href="#" className="link-yellow">Sign Up</a>
            </p>

          </div>
        </div>

      </div>
    </>
  )
}