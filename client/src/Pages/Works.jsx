import React, { useEffect, useRef } from 'react'

export default function Works() {
  const canvasRef = useRef(null)

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
        r: Math.random() * 1.4 + 0.3,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        o: Math.random() * 0.45 + 0.08,
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
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,195,0,${0.07 * (1 - dist / 100)})`
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

  const steps = [
    {
      step: '01',
      title: 'Post Your Project',
      desc: 'Describe your idea, set required skills, and publish your project to reach the right collaborators instantly.',
      tags: ['Idea Brief', 'Skill Tags', 'Project Scope'],
      stat: { value: '2 min', label: 'Avg. post time' },
      illustration: (
        <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
          <rect x="20" y="108" width="160" height="7" rx="3.5" fill="rgba(255,195,0,0.1)" stroke="rgba(255,195,0,0.22)" strokeWidth="1"/>
          <rect x="42" y="82" width="116" height="28" rx="5" fill="rgba(22,22,22,0.95)" stroke="rgba(255,195,0,0.32)" strokeWidth="1.5"/>
          <rect x="45" y="22" width="110" height="62" rx="6" fill="rgba(14,14,14,0.98)" stroke="rgba(255,195,0,0.42)" strokeWidth="1.5"/>
          <rect x="51" y="28" width="98" height="50" rx="3" fill="rgba(255,195,0,0.03)"/>
          {/* Traffic lights */}
          <circle cx="57" cy="33" r="2.5" fill="rgba(255,80,80,0.6)"/>
          <circle cx="64" cy="33" r="2.5" fill="rgba(255,195,0,0.6)"/>
          <circle cx="71" cy="33" r="2.5" fill="rgba(80,200,80,0.6)"/>
          <line x1="51" y1="38" x2="149" y2="38" stroke="rgba(255,195,0,0.08)" strokeWidth="1"/>
          {/* Code lines */}
          <rect x="57" y="44" width="52" height="3" rx="1.5" fill="rgba(255,195,0,0.65)"/>
          <rect x="57" y="51" width="36" height="3" rx="1.5" fill="rgba(255,255,255,0.22)"/>
          <rect x="57" y="58" width="62" height="3" rx="1.5" fill="rgba(255,255,255,0.18)"/>
          <rect x="57" y="65" width="42" height="3" rx="1.5" fill="rgba(255,195,0,0.38)"/>
          <rect x="57" y="72" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.14)"/>
          {/* Cursor */}
          <rect x="91" y="44" width="2" height="10" rx="1" fill="#FFC300" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0;0.9" dur="1.2s" repeatCount="indefinite"/>
          </rect>
          {/* Post button */}
          <rect x="100" y="63" width="42" height="12" rx="4" fill="rgba(255,195,0,0.88)"/>
          <text x="108" y="71.5" fontFamily="sans-serif" fontSize="5" fill="#111" fontWeight="bold">POST →</text>
          {/* Floating tags */}
          <rect x="8" y="44" width="30" height="13" rx="6.5" fill="rgba(255,195,0,0.1)" stroke="rgba(255,195,0,0.32)" strokeWidth="1"/>
          <text x="13" y="53" fontFamily="sans-serif" fontSize="5.5" fill="#FFC300">React</text>
          <rect x="160" y="36" width="32" height="13" rx="6.5" fill="rgba(255,195,0,0.1)" stroke="rgba(255,195,0,0.32)" strokeWidth="1"/>
          <text x="164" y="45" fontFamily="sans-serif" fontSize="5.5" fill="#FFC300">UI/UX</text>
          <rect x="162" y="58" width="28" height="13" rx="6.5" fill="rgba(255,195,0,0.1)" stroke="rgba(255,195,0,0.32)" strokeWidth="1"/>
          <text x="166" y="67" fontFamily="sans-serif" fontSize="5.5" fill="#FFC300">Node</text>
          <rect x="8" y="65" width="28" height="13" rx="6.5" fill="rgba(255,195,0,0.08)" stroke="rgba(255,195,0,0.25)" strokeWidth="1"/>
          <text x="12" y="74" fontFamily="sans-serif" fontSize="5.5" fill="rgba(255,195,0,0.7)">Swift</text>
          <ellipse cx="100" cy="85" rx="9" ry="2.5" fill="rgba(255,195,0,0.12)"/>
          {/* Notification ping */}
          <circle cx="155" cy="25" r="6" fill="rgba(255,195,0,0.2)" stroke="rgba(255,195,0,0.5)" strokeWidth="1">
            <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0;0.8" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="155" cy="25" r="4" fill="rgba(255,195,0,0.6)"/>
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Find Skilled Partners',
      desc: 'Our smart matching algorithm pairs you with developers, designers, and creators based on skills, availability, and project fit.',
      tags: ['AI Matching', 'Skill Filter', 'Profile View'],
      stat: { value: '94%', label: 'Match accuracy' },
      illustration: (
        <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
          <circle cx="100" cy="72" r="18" fill="rgba(255,195,0,0.12)" stroke="rgba(255,195,0,0.58)" strokeWidth="2"/>
          <circle cx="100" cy="72" r="10" fill="rgba(255,195,0,0.28)"/>
          <text x="96" y="76" fontFamily="sans-serif" fontSize="10" fill="#FFC300">⚡</text>
          <circle cx="100" cy="72" r="25" stroke="rgba(255,195,0,0.15)" strokeWidth="1" fill="none">
            <animate attributeName="r" values="18;32;18" dur="2.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          {/* Person 1 */}
          <circle cx="26" cy="46" r="17" fill="rgba(22,22,22,0.9)" stroke="rgba(255,195,0,0.38)" strokeWidth="1.5"/>
          <circle cx="26" cy="40" r="6" fill="rgba(255,195,0,0.48)"/>
          <path d="M14 58 Q26 52 38 58" stroke="rgba(255,195,0,0.48)" strokeWidth="1.5" fill="none"/>
          <rect x="10" y="66" width="32" height="8" rx="4" fill="rgba(255,195,0,0.1)" stroke="rgba(255,195,0,0.25)" strokeWidth="0.8"/>
          <text x="13" y="72" fontFamily="sans-serif" fontSize="4.5" fill="rgba(255,195,0,0.8)">Frontend</text>
          {/* Person 2 */}
          <circle cx="174" cy="46" r="17" fill="rgba(22,22,22,0.9)" stroke="rgba(255,195,0,0.38)" strokeWidth="1.5"/>
          <circle cx="174" cy="40" r="6" fill="rgba(255,195,0,0.48)"/>
          <path d="M162 58 Q174 52 186 58" stroke="rgba(255,195,0,0.48)" strokeWidth="1.5" fill="none"/>
          <rect x="158" y="66" width="32" height="8" rx="4" fill="rgba(255,195,0,0.1)" stroke="rgba(255,195,0,0.25)" strokeWidth="0.8"/>
          <text x="162" y="72" fontFamily="sans-serif" fontSize="4.5" fill="rgba(255,195,0,0.8)">Designer</text>
          {/* Person 3 */}
          <circle cx="100" cy="130" r="14" fill="rgba(22,22,22,0.9)" stroke="rgba(255,195,0,0.38)" strokeWidth="1.5"/>
          <circle cx="100" cy="125" r="5.5" fill="rgba(255,195,0,0.48)"/>
          <path d="M89 138 Q100 133 111 138" stroke="rgba(255,195,0,0.48)" strokeWidth="1.5" fill="none"/>
          <rect x="82" y="142" width="36" height="8" rx="4" fill="rgba(255,195,0,0.1)" stroke="rgba(255,195,0,0.25)" strokeWidth="0.8"/>
          <text x="87" y="148" fontFamily="sans-serif" fontSize="4.5" fill="rgba(255,195,0,0.8)">Backend</text>
          {/* Lines */}
          <line x1="43" y1="52" x2="82" y2="68" stroke="rgba(255,195,0,0.32)" strokeWidth="1.2" strokeDasharray="4 3">
            <animate attributeName="strokeDashoffset" values="0;-14" dur="1s" repeatCount="indefinite"/>
          </line>
          <line x1="157" y1="52" x2="118" y2="68" stroke="rgba(255,195,0,0.32)" strokeWidth="1.2" strokeDasharray="4 3">
            <animate attributeName="strokeDashoffset" values="0;-14" dur="1s" repeatCount="indefinite"/>
          </line>
          <line x1="100" y1="116" x2="100" y2="90" stroke="rgba(255,195,0,0.32)" strokeWidth="1.2" strokeDasharray="4 3">
            <animate attributeName="strokeDashoffset" values="0;-14" dur="1s" repeatCount="indefinite"/>
          </line>
          {/* Match badge */}
          <rect x="68" y="10" width="64" height="16" rx="8" fill="rgba(255,195,0,0.18)" stroke="rgba(255,195,0,0.5)" strokeWidth="1"/>
          <text x="76" y="21" fontFamily="sans-serif" fontSize="6.5" fill="#FFC300" fontWeight="bold">✓ 94% Match</text>
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Start Collaborating',
      desc: 'Use built-in messaging, task boards, and file sharing to plan, build, and ship your project together in one workspace.',
      tags: ['Live Chat', 'Task Board', 'File Share'],
      stat: { value: '3x', label: 'Faster delivery' },
      illustration: (
        <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
          {/* Chat bubble left 1 */}
          <rect x="10" y="10" width="92" height="26" rx="10" fill="rgba(255,195,0,0.13)" stroke="rgba(255,195,0,0.38)" strokeWidth="1.5"/>
          <path d="M22 36 L16 46 L34 36" fill="rgba(255,195,0,0.13)" stroke="rgba(255,195,0,0.38)" strokeWidth="1"/>
          <rect x="17" y="19" width="44" height="3.5" rx="1.75" fill="rgba(255,195,0,0.62)"/>
          <rect x="17" y="26" width="30" height="3.5" rx="1.75" fill="rgba(255,255,255,0.2)"/>
          {/* Chat bubble right */}
          <rect x="98" y="48" width="92" height="26" rx="10" fill="rgba(22,22,22,0.9)" stroke="rgba(255,195,0,0.28)" strokeWidth="1.5"/>
          <path d="M178 74 L184 84 L166 74" fill="rgba(22,22,22,0.9)" stroke="rgba(255,195,0,0.28)" strokeWidth="1"/>
          <rect x="105" y="57" width="54" height="3.5" rx="1.75" fill="rgba(255,255,255,0.28)"/>
          <rect x="105" y="64" width="38" height="3.5" rx="1.75" fill="rgba(255,195,0,0.42)"/>
          {/* Chat bubble left 2 */}
          <rect x="10" y="88" width="84" height="26" rx="10" fill="rgba(255,195,0,0.13)" stroke="rgba(255,195,0,0.38)" strokeWidth="1.5"/>
          <path d="M22 114 L16 124 L34 114" fill="rgba(255,195,0,0.13)" stroke="rgba(255,195,0,0.38)" strokeWidth="1"/>
          <rect x="17" y="97" width="58" height="3.5" rx="1.75" fill="rgba(255,195,0,0.62)"/>
          <rect x="17" y="104" width="40" height="3.5" rx="1.75" fill="rgba(255,255,255,0.2)"/>
          {/* Typing indicator */}
          <rect x="108" y="118" width="54" height="18" rx="9" fill="rgba(22,22,22,0.9)" stroke="rgba(255,195,0,0.22)" strokeWidth="1"/>
          <circle cx="122" cy="127" r="3" fill="rgba(255,195,0,0.5)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur=".8s" begin="0s" repeatCount="indefinite"/>
          </circle>
          <circle cx="133" cy="127" r="3" fill="rgba(255,195,0,0.5)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur=".8s" begin=".25s" repeatCount="indefinite"/>
          </circle>
          <circle cx="144" cy="127" r="3" fill="rgba(255,195,0,0.5)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur=".8s" begin=".5s" repeatCount="indefinite"/>
          </circle>
          {/* Avatar right */}
          <circle cx="177" cy="22" r="13" fill="rgba(255,195,0,0.28)" stroke="rgba(255,195,0,0.5)" strokeWidth="1.5"/>
          <circle cx="177" cy="17" r="5.5" fill="rgba(255,195,0,0.7)"/>
          <path d="M168 29 Q177 24 186 29" stroke="rgba(255,195,0,0.7)" strokeWidth="1.5" fill="none"/>
          {/* Avatar left */}
          <circle cx="18" cy="138" r="10" fill="rgba(255,195,0,0.2)" stroke="rgba(255,195,0,0.38)" strokeWidth="1.5"/>
          <circle cx="18" cy="134" r="4" fill="rgba(255,195,0,0.58)"/>
          <path d="M11 144 Q18 140 25 144" stroke="rgba(255,195,0,0.58)" strokeWidth="1.2" fill="none"/>
          {/* Task mini-board */}
          <rect x="152" y="90" width="42" height="48" rx="6" fill="rgba(14,14,14,0.85)" stroke="rgba(255,195,0,0.22)" strokeWidth="1"/>
          <rect x="156" y="97" width="34" height="5" rx="2.5" fill="rgba(255,195,0,0.4)"/>
          <rect x="156" y="106" width="28" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
          <rect x="156" y="114" width="32" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
          <rect x="156" y="122" width="22" height="4" rx="2" fill="rgba(255,195,0,0.22)"/>
          <circle cx="162" cy="129" r="2.5" fill="rgba(80,200,80,0.6)"/>
          <rect x="166" y="127" width="18" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
        </svg>
      ),
    },
    {
      step: '04',
      title: 'Launch Your Product',
      desc: 'Ship your finished product to the world. Celebrate your team\'s success and grow your developer reputation on DevForge.',
      tags: ['Go Live', 'Showcase', 'Get Reviews'],
      stat: { value: '580+', label: 'Projects launched' },
      illustration: (
        <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
          {/* Rocket */}
          <path d="M100 8 C86 30 80 62 82 96 L100 108 L118 96 C120 62 114 30 100 8Z" fill="rgba(255,195,0,0.12)" stroke="rgba(255,195,0,0.58)" strokeWidth="2"/>
          <path d="M100 3 C94 13 96 20 100 15 C104 20 106 13 100 3Z" fill="rgba(255,195,0,0.6)"/>
          {/* Window */}
          <circle cx="100" cy="60" r="13" fill="rgba(18,18,18,0.95)" stroke="rgba(255,195,0,0.58)" strokeWidth="2"/>
          <circle cx="100" cy="60" r="8" fill="rgba(255,195,0,0.16)"/>
          <circle cx="97" cy="57" r="3" fill="rgba(255,255,255,0.3)"/>
          {/* Fins */}
          <path d="M82 90 L60 112 L82 105Z" fill="rgba(255,195,0,0.22)" stroke="rgba(255,195,0,0.42)" strokeWidth="1.5"/>
          <path d="M118 90 L140 112 L118 105Z" fill="rgba(255,195,0,0.22)" stroke="rgba(255,195,0,0.42)" strokeWidth="1.5"/>
          {/* Flames */}
          <ellipse cx="92" cy="114" rx="5.5" ry="14">
            <animate attributeName="ry" values="14;18;14" dur=".4s" repeatCount="indefinite"/>
            <animate attributeName="fill" values="rgba(255,140,0,0.65);rgba(255,100,0,0.8);rgba(255,140,0,0.65)" dur=".4s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="108" cy="114" rx="5.5" ry="14">
            <animate attributeName="ry" values="14;20;14" dur=".5s" repeatCount="indefinite"/>
            <animate attributeName="fill" values="rgba(255,195,0,0.65);rgba(255,160,0,0.8);rgba(255,195,0,0.65)" dur=".5s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="100" cy="118" rx="5" ry="18">
            <animate attributeName="ry" values="18;25;18" dur=".35s" repeatCount="indefinite"/>
            <animate attributeName="fill" values="rgba(255,220,0,0.85);rgba(255,240,100,1);rgba(255,220,0,0.85)" dur=".35s" repeatCount="indefinite"/>
          </ellipse>
          {/* Stars */}
          {[[22,20],[168,14],[176,72],[18,88],[158,126],[38,136],[52,18],[152,42]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill="rgba(255,195,0,0.6)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          {/* Speed lines */}
          <line x1="48" y1="48" x2="68" y2="48" stroke="rgba(255,195,0,0.22)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="130" y1="56" x2="152" y2="56" stroke="rgba(255,195,0,0.22)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="42" y1="68" x2="66" y2="68" stroke="rgba(255,195,0,0.14)" strokeWidth="1" strokeDasharray="3 4"/>
          {/* Launch badge */}
          <rect x="62" y="132" width="76" height="14" rx="7" fill="rgba(255,195,0,0.15)" stroke="rgba(255,195,0,0.42)" strokeWidth="1"/>
          <text x="70" y="142" fontFamily="sans-serif" fontSize="6" fill="#FFC300" fontWeight="bold">🚀 LIVE ON DEVFORGE</text>
        </svg>
      ),
    },
  ]

  return (
    <div style={{ background: '#000', position: 'relative', overflow: 'hidden', fontFamily: "'Rajdhani', sans-serif" }}>
      <style>{`
       
      `}</style>

      <div className="wbg" />
      <canvas ref={canvasRef} className="wc" />

      <div className="ws">
        {/* Header */}
        <div className="wh">
          <div className="wbadge"><span className="wbdot"/>Simple 4-Step Process</div>
          <h2 className="wtitle">How It <span>Works</span></h2>
          <p className="wsub">From first idea to live product — DevForge gives you everything to find the right people and build something extraordinary together.</p>
        </div>

        {/* Cards */}
        <div className="wgrid">
          {steps.map((s, i) => (
            <div className="wcard" key={i} style={{position:'relative'}}>
              <div className="gbar"/>

              {/* Arrow to next card */}
              {i < steps.length - 1 && (
                <div style={{
                  position:'absolute', top:'38%', right:'-22px',
                  zIndex:20, display:'flex', alignItems:'center', gap:0,
                  pointerEvents:'none',
                }}>
                  <div style={{
                    width:'18px', height:'1.5px',
                    background:'linear-gradient(90deg,rgba(255,195,0,0.5),rgba(255,195,0,0.1))',
                  }}/>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M6 2l3 3-3 3" stroke="rgba(255,195,0,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              {/* Illustration */}
              <div className="willus">{s.illustration}</div>

              {/* Body */}
              <div className="wbody">
                {/* Step row */}
                <div className="wstep">
                  <span className="wsbadge">{s.step}</span>
                  <span className="wsline"/>
                </div>

                {/* Stat */}
                <div className="wstat-pill">
                  <span className="wstat-val">{s.stat.value}</span>
                  <span className="wstat-lbl">{s.stat.label}</span>
                </div>

                <div className="wttitle">{s.title}</div>
                <div className="wdesc">{s.desc}</div>

                {/* Tags */}
                <div className="wtags">
                  {s.tags.map((t) => (
                    <span className="wtag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}