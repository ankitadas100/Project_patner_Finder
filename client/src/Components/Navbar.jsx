import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { Settings, Globe, Sparkles, LogOut } from "lucide-react";
import { useUserData } from "../context/UserdataContext";
import secureLocalStorage from "react-secure-storage";
const NAV_ITEMS = ["Home", "Services", "Projects", "About", "Contact"];


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const {logout } = useAuth();
  const {useralldata}=useUserData()
  
  // Added Authentication States
  const [isLogin, setIsLogin] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    console.log(useralldata)
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const naviget=useNavigate()
const handlelogout=async()=>{
 await logout();
 secureLocalStorage.removeItem('auth-token');
  naviget("/")
  window.location.reload();
}
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

        .nb-link:hover, .nb-link.nb-active {
          color: #FFCC00;
        }

        .nb-link:hover::before, .nb-link.nb-active::before {
          transform: scaleX(1);
        }

        .nb-link:hover::after, .nb-link.nb-active::after {
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
          transition: color 0.3s, border-color 0.3s, box-shadow 0.3s;
        }

        .nb-btn-login:hover {
          border-color: #FFCC00;
          color: #fff;
          box-shadow: 0 0 16px rgba(255,204,0,0.25);
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
          box-shadow: 0 0 14px rgba(255,204,0,0.35);
          transition: transform 0.2s, box-shadow 0.3s, background 0.3s;
        }

        .nb-btn-signup:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255,204,0,0.55);
          background: #ffe033;
        }

        /* --- Profile Dropdown Styles --- */
        .nb-profile-wrapper {
          position: relative;
        }

        .nb-profile-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid rgba(255, 204, 0, 0.6);
          cursor: pointer;
          object-fit: cover;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .nb-profile-avatar:hover {
          border-color: #FFCC00;
          box-shadow: 0 0 12px rgba(255, 204, 0, 0.4);
        }

        .nb-profile-dropdown {
          position: absolute;
          top: 60px;
          right: 0;
          width: 260px;
          background: rgba(15, 15, 15, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid #FFCC00; /* Matched your gold color instead of green */
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .nb-profile-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .nb-profile-header {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nb-profile-name {
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0 0 4px 0;
        }

        .nb-profile-email {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        }

        .nb-profile-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nb-profile-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'Rajdhani', sans-serif;
        }

        .nb-profile-item:hover {
          background: rgba(255, 204, 0, 0.1);
          color: #FFCC00;
        }

        .nb-profile-item.logout {
          color: #ff4d4d;
          margin-top: 8px;
        }

        .nb-profile-item.logout:hover {
          background: rgba(255, 77, 77, 0.1);
        }

        /* --- Mobile Styles --- */
        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }

        .nb-bar {
          width: 22px;
          height: 2px;
          background: #FFCC00;
          transition: all 0.3s;
          display: block;
        }

        .nb-mobile {
          margin: 8px 0 0;
          border-radius: 18px;
          background: rgba(15, 15, 15, 0.92);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,204,0,0.18);
          padding: 16px 24px 20px;
        }

        .nb-mobile-link {
          display: flex;
          justify-content: space-between;
          padding: 12px 6px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .nb-mobile-btns {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        @media (max-width: 640px) {
          .nb-links, .nb-btns { display: none; }
          .nb-hamburger { display: flex; }
        }
      `}</style>

      <nav className="nb-root">
        <div className={`nb-inner${scrolled ? " nb-scrolled" : ""}`}>
          
          {/* Logo */}
          <Link to="/" className="nb-logo">
            <img className="logo-style" style={{ height: "78px", width: "78px" }} src={logo} alt="" />
            <div className="nb-logo-text"> <span>Dev</span><span style={{ color: "#e1a203" }}>forge</span></div>
          </Link>

          {/* Desktop Links */}
          <ul className="nb-links">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <Link
                  to="/"
                  className={`nb-link${activeItem === item ? " nb-active" : ""}`}
                  onClick={(e) => {
                     // e.preventDefault(); 
                     // setActiveItem(item); 
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions (Login/Signup OR Profile) */}
          <div className="nb-btns">
            {!useralldata ? (
              <>
                <Link to="/login"><button className="nb-btn-login">Log In</button></Link>
                <Link to="/signup"><button className="nb-btn-signup">Sign Up</button></Link>
              </>
            ) : (
              <div className="nb-profile-wrapper" ref={dropdownRef}>
                <img
                  src={useralldata.image_url}
                  alt="Profile"
                  className="nb-profile-avatar"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                />

                {/* Dropdown Menu */}
                <div className={`nb-profile-dropdown ${profileMenuOpen ? "open" : ""}`}>
                  <div className="nb-profile-header">
                    <p className="nb-profile-name">{useralldata.fullname}</p>
                    <p className="nb-profile-email">{useralldata.email}</p>
                  </div>
                  
                  <ul className="nb-profile-menu">
                    <li>
                      <Link to="/settings" className="nb-profile-item">
                        <Settings size={18} /> Account settings
                      </Link>
                    </li>
                    <li>
                      <button className="nb-profile-item">
                        <Globe size={18} /> English
                      </button>
                    </li>
                    <li>
                      <Link to="/upgrade" className="nb-profile-item">
                        <Sparkles size={18} /> Upgrade
                      </Link>
                    </li>
                    <li>
                      <button 
                        className="nb-profile-item logout"
                        onClick={handlelogout} // Dummy logout action
                      >
                        <LogOut size={18} /> Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
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
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0" }}>
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="nb-mobile-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item);
                      setMenuOpen(false);
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile Auth/Profile logic */}
            {!useralldata ? (
              <div className="nb-mobile-btns">
                <Link to="/login" style={{ flex: 1 }}><button className="nb-btn-login" style={{ width: "100%" }}>Log In</button></Link>
                <Link to="/signup" style={{ flex: 1 }}><button className="nb-btn-signup" style={{ width: "100%" }}>Sign Up</button></Link>
              </div>
            ) : (
              <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <img src={useralldata.image_url} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  <div>
                    <p style={{ color: "#fff", margin: 0, fontWeight: "bold" }}>{useralldata.fullname}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "12px" }}>{useralldata.email}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Link to="/settings" className="nb-profile-item" style={{ padding: "8px 0" }}>
                    <Settings size={18} /> Account settings
                  </Link>
                  <button className="nb-profile-item logout" onClick={() => setIsLogin(false)} style={{ padding: "8px 0" }}>
                    <LogOut size={18} /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}