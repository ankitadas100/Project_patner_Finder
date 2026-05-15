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

// --- NORMAL CSS ---
const customStyles = `
  :root {
    --bg-main: #0a0a0a;
    --bg-card: #131313;
    --bg-input: #1a1a1a;
    --bg-input-hover: #222222;
    --text-main: #ffffff;
    --text-muted: #a3a3a3;
    --text-dark: #888888;
    --primary: #FFC300;
    --primary-dark: #FF8C00;
    --border-light: #2a2a2a;
    --border-dark: #222222;
    --border-primary: #664d00;
    --border-input: #333333;
    --danger: #ef4444;
  }

  .settings-container {
    background-color: var(--bg-main);
    min-height: 100vh;
    padding: 40px 20px;
    color: var(--text-main);
    font-family: system-ui, -apple-system, sans-serif;
  }

  .settings-layout {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  @media (max-width: 900px) {
    .settings-layout {
      grid-template-columns: 1fr;
    }
  }

  .page-header {
    max-width: 1200px;
    margin: 0 auto 30px auto;
  }

  .page-title {
    font-size: 2rem;
    margin: 0 0 8px 0;
    font-weight: 700;
  }

  .highlight {
    color: var(--primary);
  }

  .page-subtitle {
    color: var(--text-muted);
    margin: 0;
  }

  /* Cards */
  .settings-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 28px;
    height: fit-content;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-light);
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  /* Profile Avatar & Upload Section */
  .profile-avatar-section {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
  }

  .avatar-upload-container {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid var(--border-light);
    flex-shrink: 0;
    transition: border-color 0.2s;
  }

  .avatar-upload-container:hover {
    border-color: var(--primary);
  }

  .profile-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background-color: var(--bg-input);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: var(--primary);
  }

  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
    color: var(--text-main);
  }

  .avatar-upload-container:hover .avatar-overlay {
    opacity: 1;
  }

  .avatar-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }

  /* Form Elements */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 600px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-label {
    display: block;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 8px;
    font-weight: 500;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    color: var(--text-dark);
    pointer-events: none;
  }

  .form-input {
    width: 100%;
    background-color: var(--bg-input);
    border: 1px solid var(--border-input);
    color: var(--text-main);
    padding: 12px 14px 12px 42px;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: all 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    background-color: var(--bg-input-hover);
  }

  .form-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  textarea.form-input {
    padding-left: 14px;
    min-height: 100px;
    resize: vertical;
  }

  /* Buttons */
  .btn-primary {
    background-color: var(--primary);
    color: #000000;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.2s;
    width: 100%;
    margin-top: 24px;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--primary-dark);
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Viewer List */
  .viewer-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .viewer-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px;
    background-color: var(--bg-input);
    border: 1px solid var(--border-input);
    border-radius: 8px;
    transition: border-color 0.2s;
  }

  .viewer-item:hover {
    border-color: var(--border-light);
  }

  .viewer-initials {
    border-radius: 50%;
    background-color: rgba(255, 195, 0, 0.1);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .viewer-info {
    flex-grow: 1;
    overflow: hidden;
  }

  .viewer-name {
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .badge-you {
    font-size: 0.65rem;
    background: var(--primary);
    color: #000;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .viewer-time {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    color: var(--text-dark);
  }

  /* States */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    color: var(--text-muted);
    gap: 12px;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .error-message {
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: var(--danger);
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }

  .empty-state {
    text-align: center;
    padding: 30px 10px;
    color: var(--text-dark);
    font-size: 0.9rem;
  }
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
            new Date(b.viewer.time) - new Date(a.viewer.time)
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
                       <img style={{width:'50px', height:'50px', borderRadius:'100%', objectFit:'cover',cursor:'pointer'}} src={`${view.viewer.proflie_url}`} alt="profile pic" />
                      </div></Link>
                      <div className="viewer-info">
                        <p className="viewer-name">
                          {view.viewer.fullname}
                          {isCurrentUser && <span className="badge-you">You</span>}
                        </p>
                        <div className="viewer-time">
                          <Clock size={12} />
                          {formatTimeAgo(view.viewer.time)}
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