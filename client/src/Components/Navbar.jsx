import { useState, useEffect } from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
const NAV_ITEMS = ["Home", "Services", "Projects", "About", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <style>{`
      
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');

        .nb-root {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          padding: 12px 24px;
          box-sizing: border-box;
          font-family: 'Rajdhani', sans-serif;
        }

        .nb-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
          border-radius: 18px;
          background: rgba(20, 20, 20, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 204, 0, 0.15);
          box-shadow: 0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,204,0,0.07);
          transition: all 0.4s ease;
        }

        .nb-inner.nb-scrolled {
          background: rgba(10, 10, 10, 0.82);
          border-color: rgba(255, 204, 0, 0.35);
          box-shadow: 0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,204,0,0.1);
        }

        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nb-logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #FFCC00, #FF8C00);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          box-shadow: 0 0 14px rgba(255,204,0,0.45);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .nb-logo:hover .nb-logo-mark {
          transform: rotate(15deg) scale(1.12);
          box-shadow: 0 0 26px rgba(255,204,0,0.75);
        }

        .nb-logo-text {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .nb-logo-text span {
          color: #FFCC00;
        }

        .nb-links {
          display: flex;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nb-link {
          position: relative;
          display: block;
          padding: 8px 16px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          border-radius: 8px;
          transition: color 0.25s ease, background 0.25s ease;
          overflow: hidden;
        }

        .nb-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,204,0,0.07);
          border-radius: 8px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 16px;
          right: 16px;
          height: 2px;
          background: linear-gradient(90deg, #FFCC00, #FF8C00);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 0 8px rgba(255,204,0,0.6);
        }

        .nb-link:hover {
          color: #FFCC00;
        }

        .nb-link:hover::before {
          transform: scaleX(1);
        }

        .nb-link:hover::after {
          transform: scaleX(1);
        }

        .nb-link.nb-active {
          color: #FFCC00;
          background: rgba(255,204,0,0.10);
        }

        .nb-link.nb-active::after {
          transform: scaleX(1);
        }

        .nb-btns {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .nb-btn-login {
          position: relative;
          padding: 9px 22px;
          background: transparent;
          color: #FFCC00;
          border: 1.5px solid rgba(255,204,0,0.45);
          border-radius: 9px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.3s, border-color 0.3s, box-shadow 0.3s;
        }

        .nb-btn-login::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,204,0,0.12);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }

        .nb-btn-login:hover {
          border-color: #FFCC00;
          color: #fff;
          box-shadow: 0 0 16px rgba(255,204,0,0.25);
        }

        .nb-btn-login:hover::before {
          width: 220px;
          height: 220px;
        }

        .nb-btn-signup {
          position: relative;
          padding: 9px 22px;
          background: #FFCC00;
          color: #111;
          border: none;
          border-radius: 9px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s, background 0.3s;
          box-shadow: 0 0 14px rgba(255,204,0,0.35);
        }

        .nb-btn-signup::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transition: left 0.45s ease;
        }

        .nb-btn-signup:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 6px 24px rgba(255,204,0,0.55);
          background: #ffe033;
        }

        .nb-btn-signup:hover::before {
          left: 100%;
        }

        .nb-btn-signup:active {
          transform: scale(0.97);
        }

        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .nb-hamburger:hover {
          background: rgba(255,204,0,0.1);
        }

        .nb-bar {
          width: 22px;
          height: 2px;
          background: #FFCC00;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          display: block;
        }

        .nb-hamburger.nb-open .nb-bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .nb-hamburger.nb-open .nb-bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .nb-hamburger.nb-open .nb-bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .nb-mobile {
          margin: 8px 0 0;
          border-radius: 18px;
          background: rgba(15, 15, 15, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,204,0,0.18);
          padding: 16px 24px 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,204,0,0.07);
          animation: nbSlide 0.25s ease;
        }

        @keyframes nbSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nb-mobile ul {
          list-style: none;
          margin: 0 0 16px 0;
          padding: 0;
        }

        .nb-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 6px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s, padding-left 0.25s, border-color 0.2s;
        }

        .nb-mobile-link:hover {
          color: #FFCC00;
          padding-left: 12px;
          border-bottom-color: rgba(255,204,0,0.2);
        }

        .nb-mobile-arrow {
          opacity: 0;
          transition: opacity 0.2s;
          font-size: 13px;
          color: #FFCC00;
        }

        .nb-mobile-link:hover .nb-mobile-arrow {
          opacity: 1;
        }

        .nb-mobile-btns {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .nb-mobile-btns .nb-btn-login,
        .nb-mobile-btns .nb-btn-signup {
          flex: 1;
          padding: 12px;
          text-align: center;
        }

        @media (max-width: 640px) {
          .nb-links { display: none; }
          .nb-btns  { display: none; }
          .nb-hamburger { display: flex; }
        }
      `}</style>

      <nav className="nb-root">
        <div className={`nb-inner${scrolled ? " nb-scrolled" : ""}`}>

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <img className="logo-style" style={{height:"78px", width:"78px"}} src={logo} alt="" />
            <div className="nb-logo-text"> <span>Dev</span><span style={{color:"#e1a203"}}>forge</span></div>
          </Link>

          {/* Desktop Links */}
          <ul className="nb-links">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                
                 <Link to="/"
                  className={`nb-link${activeItem === item ? " nb-active" : ""}`}
                  // onClick={(e) => { e.preventDefault(); setActiveItem(item); }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="nb-btns">
            <button className="nb-btn-login">Log In</button>
           <Link to="/signup"> <button className="nb-btn-signup">Sign Up</button></Link>
          </div>

          {/* Hamburger */}
          <button
            className={`nb-hamburger${menuOpen ? " nb-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="nb-bar" />
            <span className="nb-bar" />
            <span className="nb-bar" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="nb-mobile">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  
                   <Link to="/"
                    className="nb-mobile-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item);
                      setMenuOpen(false);
                    }}
                  >
                    {item}
                    <span className="nb-mobile-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nb-mobile-btns">
              <button className="nb-btn-login">Log In</button>
              <button className="nb-btn-signup">Sign Up</button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
