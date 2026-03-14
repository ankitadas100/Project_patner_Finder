import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
  const canvasRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Particle animation
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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    })
  }

  return (
    <div onMouseMove={handleMouseMove} style={{
      minHeight: '100vh', background: '#000',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Rajdhani', sans-serif",
    }}>
      <style>{`
       
      `}</style>

      {/* Background */}
      <div className="hero-bg-grad" />
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-wrap">
        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Now in Beta — Join Free
          </div>

          <h1 className="hero-title">
            Find the <span className="hero-title-accent">Perfect Partner</span><br />
            for Your Project
          </h1>

          <p className="hero-desc">
            Share your idea, connect with talented people, and build amazing projects together. Your next big thing starts here.
          </p>

          <div className="hero-btns">
            <button className="btn-primary">Post Your Project</button>
            <button className="btn-glass">Find a Partner</button>
          </div>

          <div className="hero-features">
            {[
              'Skill-based partner matching',
              'Collaboration for real projects',
              'Build and launch ideas together',
            ].map((f) => (
              <div className="feature-item" key={f}>
                <span className="feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Visual */}
        <div className="hero-right">
          <div
            className="visual-scene"
            style={{ transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)` }}
          >
            {/* Orbit rings */}
            <div className="orbit orbit-1">
              <div className="orbit-node" style={{ top: '-5px', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
            <div className="orbit orbit-2">
              <div className="orbit-node" style={{ top: '-5px', left: '50%', transform: 'translateX(-50%)', background: '#FF8C00' }} />
              <div className="orbit-node" style={{ bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, opacity: 0.6 }} />
            </div>
            <div className="orbit orbit-3" />

            {/* Central orb */}
            <div className="orb-center" />

            {/* Floating cards */}
            <div className="float-card card-top-left">
              <div className="card-label">Match Score</div>
              <div className="card-value"><span>94%</span> Match</div>
              <div className="match-bar"><div className="match-fill" /></div>
            </div>

            <div className="float-card card-top-right">
              <div className="card-label">Active Partners</div>
              <div className="card-value"><span>2.4k</span>+</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                {['#FFC300', '#FF8C00', '#FFE066', '#E6A800'].map((c, i) => (
                  <div key={i} className="avatar" style={{ background: c }}>{['A','B','C','D'][i]}</div>
                ))}
              </div>
            </div>

            <div className="float-card card-bottom-left">
              <div className="card-label">Skills Matched</div>
              <div className="card-skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">UI/UX</span>
                <span className="skill-tag">Node</span>
              </div>
            </div>

            <div className="float-card card-bottom-right">
              <div className="card-label">Projects Live</div>
              <div className="card-value"><span>580</span>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
