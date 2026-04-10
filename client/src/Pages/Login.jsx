import React, { useState, useEffect, useRef } from 'react'
import { handleError, handleSuccess } from '../Components/ErrorMessage'
import { useNavigate } from 'react-router'
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { GithubAuthProvider } from 'firebase/auth';
import secureLocalStorage from 'react-secure-storage';
export default function Login() {
  const { user, googleSignIn, githubSignIn, setLocaluser } = useAuth();
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loder, setloder] = useState(false)
  const [loder1, setloder1] = useState(false)
  const [loder2, setloder2] = useState(false)
  const [otp, setotp] = useState('')
  const [finalemail, setfinalemail] = useState('')
  const naviget = useNavigate()
  const canvasRef = useRef(null)
  useEffect(() => {
    setTimeout(() => setMounted(true), 80)
  }, [])
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,195,0,${p.o})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,195,0,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) return

      setloder(true)
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: pass })
      });
      const data = await responce.json()

      if (!data.status) {
        setloder(false)
        return handleError("Invalid credential")

      }
      secureLocalStorage.setItem('auth-token', data.token)
      handleSuccess("Login Successful")
      setLocaluser(true)
      return naviget("/")
    } catch (error) {
      setloder(false)
      handleError("Internal Server Error !, Try Again")
      return console.error(error);
    }

  }


  const handlegoogleauth = async () => {
    setloder1(true)
    try {
      const data = await googleSignIn();
      console.log(data.user.email)
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login-email`
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: data.user.email })
      });
      const data2 = await responce.json()
      console.log(data2)
      if (!data2.status) {
        setloder1(false)
        return handleError("You don't have any account! Sigup frist.")
      }
      setfinalemail(data.user.email)
      handleSuccess("Login successful")
      setloder1(false)
      return naviget("/")
    } catch (error) {
      console.log(error)
      handleError("Someing wrong. Try Again !")
      return setloder1(false)
    }
  }
  const handlegithubauth = async () => {
    try {
      setloder2(true);
      const data = await githubSignIn();
      console.log(data.user)
      const credential = GithubAuthProvider.credentialFromResult(data);
      const accessToken = credential.accessToken;
      console.log("Github Access Token:", accessToken);
      const res = await fetch("https://api.github.com/user/emails", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json"
        }
      });
      const email = await res.json();
      // console.log(email[0]);
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login-email`
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email[0].email })
      });
      const data2 = await responce.json()
      console.log(data2)
      if (!data2.status) {
        setloder2(false)
        return handleError("You don't have any account! Sigup frist.")
      }

      handleSuccess("Login successful")
      setloder2(false)
      return naviget("/")
    } catch (error) {
      console.log(error)
      handleError("Someing wrong. Try Again !")
      return setloder2(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%', background: "#000",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Rajdhani', sans-serif", position: 'relative',
      overflow: 'hidden', padding: '120px 24px 24px', boxSizing: 'border-box',
    }}>
      <style>{`
        
      `}</style>
      <div className="hero-bg-grad" />
      <canvas ref={canvasRef} className="hero-canvas" />


      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%,#000 40%,transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%,#000 40%,transparent 100%)',
      }} />

      {/* Glass Card */}
      <div className="glass-card">

        {/* Logo */}
          <>
            <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.06em', lineHeight: 1.15, textTransform: 'uppercase', textAlign: "center" }}>
              Login
            </h1>
            <form >
              <label style={{ display: 'block', color: 'rgba(255,255,255,.55)', fontSize: '.9rem', fontWeight: 600, marginBottom: 9, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Enter your email
              </label>
              <input
                className="email-input-login"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className="email-input-login"
                type="password"
                placeholder="*****"
                value={pass}
                onChange={e => setPass(e.target.value)}
                required
              />

              <button type='submit' disabled={loder ? true : false} className="verify-btn" style={{ marginTop: 22 }} onClick={handleSubmit}>
                {loder ? <span class="loader"></span> : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '26px 0' }}>
              <div className="divline" />
              <span style={{ color: 'rgba(255,255,255,.25)', fontSize: '.82rem', whiteSpace: 'nowrap', fontFamily: 'sans-serif', letterSpacing: '.04em' }}>or continue with</span>
              <div className="divline" />
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button disabled={loder1 ? true : false} className="social-btn" onClick={handlegoogleauth}>
                {loder1 ? <span class="loader-gg"></span> : <><svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.657 14.148 17.64 11.84 17.64 9.2z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
                  <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                </svg>
                  Google</>}
              </button>
              <button disabled={loder2 ? true : false} className="social-btn" onClick={handlegithubauth}>
                {loder2 ? <span class="loader-gg"></span> : <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                  GitHub</>}
              </button>
            </div>

            <p style={{ color: 'rgba(255,255,255,.22)', fontSize: '.82rem', textAlign: 'center', margin: '24px 0 0', lineHeight: 1.7, fontFamily: 'sans-serif' }}>
              Don't have an account? <span className="link">Signup</span><br />
              <span style={{ fontSize: '.76rem' }}>By continuing, you agree to our <span className="link">Terms</span> &amp; <span className="link">Privacy Policy</span>.</span>
            </p>
          </>
      </div>
    </div>

  )
}