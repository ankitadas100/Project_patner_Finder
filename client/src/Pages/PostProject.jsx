import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { handleError, handleSuccess } from '../Components/ErrorMessage';
import { Users, Check, X, User, Clock, FolderGit2, Activity, Github, ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import "../styles/hackthonpost.css"

// --- NORMAL CSS ---
const customStyles = `
  :root {
      --bg-main: #0a0a0a;
      --bg-card: #131313;
      --bg-input: #1a1a1a;
      --bg-input-hover: #1a1400;
      --text-main: #ffffff;
      --text-muted: #a3a3a3;
      --text-dark: #888888;
      --primary: #FFC300;
      --primary-dark: #FF8C00;
      --border-light: #2a2a2a;
      --border-dark: #222222;
      --border-primary: #664d00;
      --border-input: #333333;

      /* Action Colors for Accept/Reject */
      --success: #10b981;
      --success-bg: rgba(16, 185, 129, 0.1);
      --danger: #ef4444;
      --danger-bg: rgba(239, 68, 68, 0.1);
  }

  .btn-reject, .btn-delete-post {
      background: transparent;
      color: var(--danger);
      border: 1px solid var(--danger-bg);
  }
  
  .btn-accept {
      background: transparent;
      color: var(--success);
      border: 1px solid var(--success-bg);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
  }
  
  .btn-accept:hover {
      background: var(--success);
      color: #fff;
      border-color: var(--success);
  }

  .btn-delete-post, .btn-reject {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
  }

  .btn-delete-post:hover, .btn-reject:hover {
      background: var(--danger);
      color: #fff;
      border-color: var(--danger);
  }

  /* --- MODAL CSS --- */
  .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(4px);
  }
  .modal-content {
      background: var(--bg-card);
      padding: 24px;
      border-radius: 12px;
      width: 90%;
      max-width: 450px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      color: var(--text-main);
      border: 1px solid var(--border-light);
  }
  .modal-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
  }
  .modal-header.danger { color: var(--danger); }
  .modal-header.success { color: var(--success); }
  
  .modal-header h3 { margin: 0; font-size: 1.25rem; color: var(--text-main); }
  .modal-warning {
      font-size: 0.95rem;
      margin-bottom: 20px;
      line-height: 1.5;
      color: var(--text-muted);
  }
  .modal-form-group {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
  }
  .modal-checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      color: var(--text-muted);
  }
  .modal-input {
      padding: 10px 12px;
      border: 1px solid var(--border-input);
      border-radius: 6px;
      width: 100%;
      font-size: 0.95rem;
      background: var(--bg-input);
      color: var(--text-main);
  }
  .modal-input:focus {
      outline: none;
      border-color: var(--primary);
      background: var(--bg-input-hover);
  }
  .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
  }
  .btn-modal-cancel {
      padding: 8px 16px;
      border: 1px solid var(--border-input);
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: var(--text-muted);
  }
  .btn-modal-cancel:hover { background: var(--bg-input); color: var(--text-main); }
  
  .btn-modal-delete {
      padding: 8px 16px;
      border: none;
      background: var(--danger);
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: opacity 0.2s;
  }
  .btn-modal-accept {
      padding: 8px 16px;
      border: none;
      background: var(--success);
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: opacity 0.2s;
  }
  .btn-modal-delete:disabled, .btn-modal-accept:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
`;

// --- SKELETON COMPONENT ---
const SkeletonPost = () => (
    <div className="post-card">
        <div className="post-card-header">
            <div className="post-header-top">
                <div className="skeleton sk-title"></div>
                <div className="skeleton sk-tag" style={{ width: '100px', height: '36px' }}></div>
            </div>
            <div className="skeleton sk-meta"></div>
            <div className="skills-container">
                <div className="skeleton sk-tag"></div>
                <div className="skeleton sk-tag"></div>
                <div className="skeleton sk-tag"></div>
            </div>
        </div>
        <div className="applicants-section">
            <div className="skeleton sk-meta" style={{ width: '150px', marginBottom: '16px' }}></div>
            <div className="skeleton sk-row"></div>
            <div className="skeleton sk-row"></div>
        </div>
    </div>
);

export default function PostProject() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loder, setLoder] = useState(false);

    // --- Delete Modal State Variables ---
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [deleteInputText, setDeleteInputText] = useState("");
    const [isDeleteChecked, setIsDeleteChecked] = useState(false);

    // --- Accept/Reject Modal State Variables ---
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [actionConfig, setActionConfig] = useState({
        type: '', // 'accept' or 'reject'
        applicationId: null,
        postId: null,
        eventName: '',
        email: ''
    });
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const token = await user?.getIdToken();
                const localtoken = secureLocalStorage.getItem('auth-token');

                if (!token && !localtoken) {
                    handleError('Login First');
                    return navigate('/login');
                }

                let headers = { "Content-Type": "application/json" };
                if (localtoken) {
                    headers["auth-token"] = localtoken;
                } else if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/user-project-posts-with-applicants`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: headers,
                });

                const data = await response.json();
                if (data.success) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                handleError('Internal server error, try again');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [user, navigate]);

    const handleGoBack = () => {
        navigate(-1);
    };

    // ----------------------------------------------------
    // POST DELETION LOGIC
    // ----------------------------------------------------
    const initiateDeletePost = (post) => {
        setPostToDelete(post);
        setDeleteInputText("");
        setIsDeleteChecked(false);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setPostToDelete(null);
        setDeleteInputText("");
        setIsDeleteChecked(false);
    };

    const confirmDeletePost = async () => {
        if (!postToDelete) return;

        if (!isDeleteChecked || deleteInputText !== postToDelete.ProjectTitle) {
            return;
        }

        const postId = postToDelete._id;
        console.log("Deleting post ID:", postId);

        try {
            setLoder(true);
            const token = await user?.getIdToken();
            const localtoken = secureLocalStorage.getItem('auth-token');
            let headers = { "Content-Type": "application/json" };
            if (localtoken) {
                headers["auth-token"] = localtoken;
            } else if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/delete-project/${postId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            });
            
            handleSuccess('Delete Successful');
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            closeDeleteModal();
        } catch (error) {
            console.error("Failed to delete", error);
            handleError("Failed to delete the post.");
        } finally {
            setLoder(false);
        }
    };

    // ----------------------------------------------------
    // APPLICATION ACCEPT/REJECT LOGIC
    // ----------------------------------------------------
    const handleAcceptClick = (applicationId, postId, eventName, email) => {
        setActionConfig({ type: 'accept', applicationId, postId, eventName, email });
        setActionModalOpen(true);
    };

    const handleRejectClick = (applicationId, postId, eventName, email) => {
        setActionConfig({ type: 'reject', applicationId, postId, eventName, email });
        setActionModalOpen(true);
    };

    const closeActionModal = () => {
        setActionModalOpen(false);
        setActionConfig({ type: '', applicationId: null, postId: null, eventName: '', email: '' });
    };

    const confirmApplicationAction = async () => {
        setActionLoading(true);
        const { type, applicationId, postId, eventName, email } = actionConfig;
        
        try {
            const token = await user?.getIdToken();
            const localtoken = secureLocalStorage.getItem('auth-token');
            let headers = { "Content-Type": "application/json" };
            if (localtoken) headers["auth-token"] = localtoken;
            else if (token) headers["Authorization"] = `Bearer ${token}`;

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/${type}-application/${applicationId}`;
            
            const response = await fetch(url, {
                method: "PUT",
                headers,
                body: JSON.stringify({ eventName, email })
            });
            const data = await response.json();

            if (response.ok && data.status) {
                handleSuccess(`Applicant ${type}ed successfully! An email has been sent.`);
                
                // Optimistic UI update: change the status of the specific applicant
                setPosts((prevPosts) => prevPosts.map((post) => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            applications: post.applications.map((app) => 
                                app._id === applicationId ? { ...app, status: `${type}ed` } : app
                            )
                        };
                    }
                    return post;
                }));
                closeActionModal();
            } else {
                handleError(data.msg || `Failed to ${type} application`);
            }
        } catch (error) {
            console.error(error);
            handleError("Something went wrong. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleViewProfile = (applicantId) => {
        console.log("Navigating to profile:", applicantId);
        navigate(`/profile/${applicantId}`);
    };

    return (
        <>
            <style>{customStyles}</style>

            {/* --- DELETE CONFIRMATION MODAL --- */}
            {deleteModalOpen && postToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header danger">
                            <AlertTriangle size={24} />
                            <h3>Delete Project Post</h3>
                        </div>

                        <p className="modal-warning">
                            Are you sure you want to delete <strong>{postToDelete.ProjectTitle}</strong>?
                            This action cannot be undone and all applicant data for this post will be lost.
                        </p>

                        <div className="modal-form-group">
                            <label className="modal-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={isDeleteChecked}
                                    onChange={(e) => setIsDeleteChecked(e.target.checked)}
                                />
                                <span>I confirm that I want to permanently delete this project.</span>
                            </label>
                        </div>

                        <div className="modal-form-group">
                            <label style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                                Please type <strong>{postToDelete.ProjectTitle}</strong> to confirm:
                            </label>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder={postToDelete.ProjectTitle}
                                value={deleteInputText}
                                onChange={(e) => setDeleteInputText(e.target.value)}
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn-modal-cancel" onClick={closeDeleteModal}>
                                Cancel
                            </button>
                            <button
                                className="btn-modal-delete"
                                onClick={confirmDeletePost}
                                disabled={!isDeleteChecked || deleteInputText !== postToDelete.ProjectTitle || loder}
                            >
                                {loder ? <span className="loader-gg"></span> : "Final Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- ACCEPT / REJECT APPLICATION MODAL --- */}
            {actionModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className={`modal-header ${actionConfig.type === 'accept' ? 'success' : 'danger'}`}>
                            {actionConfig.type === 'accept' ? <Check size={24} /> : <X size={24} />}
                            <h3>{actionConfig.type === 'accept' ? 'Accept' : 'Reject'} Applicant</h3>
                        </div>
                        <p className="modal-warning">
                            Are you sure you want to <strong>{actionConfig.type}</strong> the application from 
                            <strong> {actionConfig.email}</strong> for the project <strong>{actionConfig.eventName}</strong>?
                            <br/><br/>
                            An automated email will be sent to the user notifying them of this decision.
                        </p>
                        <div className="modal-actions">
                            <button className="btn-modal-cancel" onClick={closeActionModal} disabled={actionLoading}>
                                Cancel
                            </button>
                            <button
                                className={actionConfig.type === 'accept' ? 'btn-modal-accept' : 'btn-modal-delete'}
                                onClick={confirmApplicationAction}
                                disabled={actionLoading}
                            >
                                {actionLoading ? <span className="loader-gg"></span> : `Confirm ${actionConfig.type.charAt(0).toUpperCase() + actionConfig.type.slice(1)}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="manager-container">
                <div className="header-section">
                    <div className="back-nav">
                        <button className="btn-back" onClick={handleGoBack}>
                            <ArrowLeft size={18} /> Back
                        </button>
                    </div>

                    <h1 className="header-title">Manage <span>Project Team</span></h1>
                    <p className="header-subtitle">Review and manage developers applying to your project requirements.</p>
                </div>

                <div className="posts-list">
                    {loading ? (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="post-card">
                                <div className="post-card-header">
                                    <div className="post-info">
                                        <div className="post-header-top" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h3>{post.ProjectTitle}</h3>

                                            <button
                                                className="btn-delete-post"
                                                onClick={() => initiateDeletePost(post)}
                                                title="Delete this project post"
                                            >
                                                <Trash2 size={16} /> Delete Post
                                            </button>
                                        </div>

                                        <div className="post-meta">
                                            <span className="post-meta-item">
                                                <FolderGit2 size={16} /> {post.ProjectType}
                                            </span>
                                            <span className="post-meta-item">
                                                <Activity size={16} /> Status: {post.ProjectStatus}
                                            </span>
                                            <span className="post-meta-item">
                                                <Users size={16} /> {post.applications?.length || 0} Applicants
                                            </span>
                                            {post.ProjectRepoLink && (
                                                <span className="post-meta-item">
                                                    <Github size={16} />
                                                    <a href={post.ProjectRepoLink} target="_blank" rel="noopener noreferrer" className="repo-link">
                                                        Repository
                                                    </a>
                                                </span>
                                            )}
                                        </div>

                                        <div className="skills-container">
                                            {post.RequiredSkills?.map((skill, idx) => (
                                                <span key={idx} className="skill-badge">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="applicants-section">
                                    <h4 className="applicants-title">
                                        <Users size={18} /> Applications
                                    </h4>

                                    {post.applications && post.applications.length > 0 ? (
                                        <div className="applicant-list">
                                            {post.applications.map((app) => (
                                                <div key={app._id} className="applicant-row">
                                                    <div className="applicant-details">
                                                        <span className="applicant-email">
                                                            {app.applicant?.email || "Unknown User"}
                                                        </span>
                                                        <span className="applicant-date">
                                                            <Clock size={12} />
                                                            Applied on {new Date(app.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <div className={`applicant-actions ${app.status === 'pending' ? 'has-actions' : ''}`}>
                                                        <span className={`status-badge status-${app.status.toLowerCase()}`}>
                                                            {app.status}
                                                        </span>

                                                        <button
                                                            className="btn btn-profile"
                                                            onClick={() => handleViewProfile(app.applicant?._id)}
                                                        >
                                                            <User size={14} /> Profile
                                                        </button>

                                                        {app.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    className="btn btn-accept"
                                                                    onClick={() => handleAcceptClick(app._id, post._id, post.ProjectTitle, app.applicant?.email)}
                                                                >
                                                                    <Check size={14} /> Accept
                                                                </button>
                                                                <button
                                                                    className="btn btn-reject"
                                                                    onClick={() => handleRejectClick(app._id, post._id, post.ProjectTitle, app.applicant?.email)}
                                                                >
                                                                    <X size={14} /> Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>
                                            No applications received yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <FolderGit2 size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <h3>No Project Posts Found</h3>
                            <p>You haven't created any project requirements yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}