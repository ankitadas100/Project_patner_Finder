import { useState, useEffect } from "react";
import { Link } from "react-router";
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
      
       
      `}</style>

      <nav className="nb-root">
        <div className={`nb-inner${scrolled ? " nb-scrolled" : ""}`}>

          {/* Logo */}
          <a href="#" className="nb-logo">
            <div className="nb-logo-mark">⚡</div>
            <div className="nb-logo-text">Devforge<span></span></div>
          </a>

          {/* Desktop Links */}
          <ul className="nb-links">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                
                 <a href="#"
                  className={`nb-link${activeItem === item ? " nb-active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveItem(item); }}
                >
                  {item}
                </a>
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
                  
                   <a href="#"
                    className="nb-mobile-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item);
                      setMenuOpen(false);
                    }}
                  >
                    {item}
                    <span className="nb-mobile-arrow">→</span>
                  </a>
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