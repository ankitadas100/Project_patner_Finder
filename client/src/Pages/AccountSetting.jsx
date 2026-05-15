import React, { useEffect, useState, useRef } from 'react';
import { useUserData } from "../context/UserdataContext";
import secureLocalStorage from 'react-secure-storage';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Building, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  Eye, 
  Save, 
  Loader2,
  AlertCircle,
  Clock,
  Camera,
  UploadCloud
} from 'lucide-react';
import { Link } from 'react-router';
import '../styles/accountSettings.css'
// --- NORMAL CSS ---
const customStyles = `

`;

// --- HELPER FUNCTION ---
const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  
  return date.toLocaleDateString();
};

export default function AccountSetting() {
  const { useralldata } = useUserData();
  const { user } = useAuth();
  
  // File Upload Ref
  const fileInputRef = useRef(null);
  
  // State
  const [viewers, setViewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Image Upload State
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: '',
    collagename: '',
    bio: '',
    githublink: '',
    linkedinlink: '',
    protfolio: '',
    skill: '' 
  });

  // Sync context data to local form state once it loads
  useEffect(() => {
    if (useralldata) {
      setFormData({
        fullname: useralldata.fullname || '',
        collagename: useralldata.collagename || '',
        bio: useralldata.bio || '',
        githublink: useralldata.githublink || '',
        linkedinlink: useralldata.linkedinlink || '',
        protfolio: useralldata.protfolio || '',
        skill: useralldata.skill ? useralldata.skill.join(', ') : '' 
      });
      // Set initial avatar if exists
      if (useralldata.image_url) {
        setAvatarPreview(useralldata.image_url);
      }
    }
  }, [useralldata]);

  useEffect(() => {
    const fetchUserAccountViewData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await user?.getIdToken();
        const localtoken = secureLocalStorage.getItem('auth-token');

        let headers = { "Content-Type": "application/json" };
        if (localtoken) {
          headers["auth-token"] = localtoken;
        } else if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        } else {
          setLoading(false);
          return;
        }

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/view-profile-account`;
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        if (data.success) {
          const sortedViews = data.useridview.sort((a, b) => 
            new Date(b.viewedAt) - new Date(a.viewedAt)
          );
          console.log(sortedViews)
          setViewers(sortedViews);
        } else {
          setError(data.message || "Failed to load profile views");
        }
      } catch (err) {
        console.error(err);
        setError("Network error while fetching profile views.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserAccountViewData();
    }
  }, [user]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Trigger hidden file input
  const handleAvatarClick = () => {
    if (!isUploadingAvatar) {
      fileInputRef.current.click();
    }
  };

  // Handle actual file selection and simulated upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show immediate preview
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);

    // 2. Start upload process
    setIsUploadingAvatar(true);

    try {
      // Create FormData to send to your backend
      const uploadData = new FormData();
      uploadData.append('image', file);

      // TODO: Replace this with your actual image upload API call
      // Example:
      // const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/upload-avatar`;
      // const response = await fetch(url, { method: "POST", headers: {...}, body: uploadData });
      // const data = await response.json();
      
      console.log("Uploading file:", file.name);
      
      // Simulating network request delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // alert("Photo uploaded successfully!");
      
    } catch (err) {
      console.error("Failed to upload image", err);
      alert("Failed to upload photo. Please try again.");
      // Revert to original if failed
      setAvatarPreview(useralldata?.image_url);
    } finally {
      setIsUploadingAvatar(false);
      // Clean up the object URL to avoid memory leaks
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formattedSkills = formData.skill
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');

      const payload = {
        ...formData,
        skill: formattedSkills
      };

      // TODO: Replace with your actual update API call
      console.log("Submitting Profile Payload:", payload);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Profile updated successfully!");
      
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="settings-container">
        
        <header className="page-header">
          <h1 className="page-title">Account <span className="highlight">Settings</span></h1>
          <p className="page-subtitle">Manage your public profile and see who is viewing your account.</p>
        </header>

        <div className="settings-layout">
          
          {/* Left Column: Profile Update Form */}
          <div className="settings-card">
            <div className="card-header">
              <User className="highlight" size={24} />
              <h2 className="card-title">Edit Profile</h2>
            </div>

            <div className="profile-avatar-section">
              
              {/* Avatar Upload Container */}
              <div className="avatar-upload-container" onClick={handleAvatarClick}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="profile-avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {useralldata?.fullname?.charAt(0) || 'U'}
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="avatar-overlay">
                  <Camera size={24} />
                </div>

                {/* Loading Overlay */}
                {isUploadingAvatar && (
                  <div className="avatar-loading-overlay">
                    <Loader2 size={24} className="spin" />
                  </div>
                )}

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/png, image/jpeg, image/jpg, image/webp" 
                  style={{ display: 'none' }} 
                />
              </div>

              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem' }}>{useralldata?.fullname || 'Loading...'}</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{useralldata?.email || ''}</p>
                <p style={{ margin: '6px 0 0 0', color: 'var(--primary)', fontSize: '0.75rem', cursor: 'pointer' }} onClick={handleAvatarClick}>
                  Change Photo
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="form-grid">
                
                <div className="form-group full-width">
                  <label className="form-label">Full Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="form-input" 
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (Read Only)</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      value={useralldata?.email || ''} 
                      className="form-input" 
                      disabled 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">College / University</label>
                  <div className="input-wrapper">
                    <Building size={18} className="input-icon" />
                    <input 
                      type="text" 
                      name="collagename"
                      value={formData.collagename}
                      onChange={handleInputChange}
                      className="form-input" 
                      placeholder="Where do you study?"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Bio</label>
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="Tell us a little about yourself..."
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Skills (Comma separated)</label>
                  <textarea 
                    name="skill"
                    value={formData.skill}
                    onChange={handleInputChange}
                    className="form-input" 
                    style={{ minHeight: '60px' }}
                    placeholder="e.g. React, Node.js, Python, MongoDB"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GitHub Link</label>
                  <div className="input-wrapper">
                    <Github size={18} className="input-icon" />
                    <input 
                      type="url" 
                      name="githublink"
                      value={formData.githublink}
                      onChange={handleInputChange}
                      className="form-input" 
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">LinkedIn Link</label>
                  <div className="input-wrapper">
                    <Linkedin size={18} className="input-icon" />
                    <input 
                      type="url" 
                      name="linkedinlink"
                      value={formData.linkedinlink}
                      onChange={handleInputChange}
                      className="form-input" 
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Portfolio Website</label>
                  <div className="input-wrapper">
                    <LinkIcon size={18} className="input-icon" />
                    <input 
                      type="url" 
                      name="protfolio"
                      value={formData.protfolio}
                      onChange={handleInputChange}
                      className="form-input" 
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

              </div>

              <button type="submit" className="btn-primary" disabled={isSaving}>
                {isSaving ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                {isSaving ? 'Saving Changes...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Right Column: Profile Views */}
          <div className="settings-card">
            <div className="card-header">
              <Eye className="highlight" size={24} />
              <h2 className="card-title">Profile Views</h2>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {loading ? (
              <div className="loading-container">
                <Loader2 size={32} className="spin highlight" />
                <span>Loading views...</span>
              </div>
            ) : viewers.length > 0 ? (
              <div className="viewer-list">
                {viewers.map((view) => {
                  const isCurrentUser = view.viewer._id === useralldata?._id;
                  
                  return (
                    <div key={view._id} className="viewer-item">
                     <Link to={`/profile/${view.viewer._id}`}> <div className="viewer-initials">
                        {/* {console.log(view)}` */}
                       <img style={{width:'50px', height:'50px', borderRadius:'100%', objectFit:'cover',cursor:'pointer'}} src={`${view.viewer.profile_url}`} alt="profile pic" />
                      </div></Link>
                      <div className="viewer-info">
                        <p className="viewer-name">
                          {view.viewer.fullname}
                          {isCurrentUser && <span className="badge-you">You</span>}
                        </p>
                        <div className="viewer-time">
                          <Clock size={12} />
                          {formatTimeAgo(view.viewedAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <Eye size={40} style={{ opacity: 0.2, marginBottom: '12px' }} />
                <p>No one has viewed your profile yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}