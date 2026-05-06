import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import secureLocalStorage from 'react-secure-storage';
import { handleError } from '../Components/ErrorMessage';
import { useParams, useNavigate } from 'react-router';
import { Mail, GraduationCap, Github, Linkedin, Calendar, Code2, ArrowLeft, User } from 'lucide-react';
import "../styles/profile.css"
import backlogo from "../assets/backlogo.png"
// --- NORMAL CSS ---
const customStyles = `

`;

// --- SKELETON COMPONENT ---
const SkeletonProfile = () => (
  <div className="profile-card">
    <div className="profile-banner"></div>
    <div className="profile-content">
      <div className="profile-left">
        <div className="skeleton sk-avatar"></div>
        <div className="social-links">
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '8px' }}></div>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '8px' }}></div>
        </div>
      </div>
      <div className="profile-right">
        <div>
          <div className="skeleton sk-title"></div>
          <div className="skeleton sk-text-short"></div>
          <div className="skeleton sk-text-short" style={{ width: '30%' }}></div>
        </div>
        
        <div>
          <div className="skeleton sk-text-short" style={{ height: '24px', width: '120px' }}></div>
          <div className="skeleton sk-text"></div>
          <div className="skeleton sk-text" style={{ width: '80%' }}></div>
        </div>

        <div>
          <div className="skeleton sk-text-short" style={{ height: '24px', width: '120px' }}></div>
          <div className="skills-container">
            <div className="skeleton sk-tag"></div>
            <div className="skeleton sk-tag"></div>
            <div className="skeleton sk-tag"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Profile() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const token = await user?.getIdToken();
        const localtoken = secureLocalStorage.getItem('auth-token');
        
        let headers = { "Content-Type": "application/json" };
        if (localtoken) {
          headers["auth-token"] = localtoken;
        } else if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getuserprofile/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        
        if (data.status) {
          setProfileData(data.data);
        } else {
          handleError("Could not load profile data.");
        }

      } catch (error) {
        console.error("Fetch error:", error);
        handleError('Internal server error, try again');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [user, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="profile-page-container">
        <div className="profile-wrapper">
          
          <div className="back-nav">
            <button className="btn-back" onClick={handleGoBack}>
              <ArrowLeft size={18} /> Back
            </button>
          </div>

          {loading ? (
            <SkeletonProfile />
          ) : profileData ? (
            <div className="profile-card">
              <div className="profile-banner">
                <img src={backlogo}  style={{ height:'119px',width:"799px"}} alt="" />
              </div>
              
              <div className="profile-content">
                
                {/* Left Side: Avatar & Socials */}
                <div className="profile-left">
                  <div className="profile-avatar-container">
                    <img 
                      src={profileData.image_url || 'https://via.placeholder.com/150'} 
                      alt={profileData.fullname} 
                      className="profile-avatar"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=User'; }}
                    />
                  </div>
                  
                  <div className="social-links">
                    {profileData.githublink && (
                      <a href={profileData.githublink} target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                        <Github size={20} />
                      </a>
                    )}
                    {profileData.linkedinlink && (
                      <a href={profileData.linkedinlink} target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                        <Linkedin size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Info, Bio, Skills */}
                <div className="profile-right">
                  
                  <div className="profile-header-info">
                    <h1>{profileData.fullname}</h1>
                    <div className="profile-meta">
                      <div className="meta-item">
                        <Mail size={16} />
                        <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
                      </div>
                      {profileData.collagename && (
                        <div className="meta-item">
                          <GraduationCap size={16} />
                          <span>{profileData.collagename}</span>
                        </div>
                      )}
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>Joined {new Date(profileData.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric'})}</span>
                      </div>
                    </div>
                  </div>

                  {profileData.bio && (
                    <div className="profile-section">
                      <h3 className="profile-section-title">
                        <User size={18} /> About
                      </h3>
                      <p className="profile-bio">{profileData.bio}</p>
                    </div>
                  )}

                  {profileData.skill && profileData.skill.length > 0 && (
                    <div className="profile-section">
                      <h3 className="profile-section-title">
                        <Code2 size={18} /> Skills & Expertise
                      </h3>
                      <div className="skills-container">
                        {profileData.skill.map((s, index) => (
                          <span key={index} className="skill-badge">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              User profile not found.
            </div>
          )}

        </div>
      </div>
    </>
  );
}