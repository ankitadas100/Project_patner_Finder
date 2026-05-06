import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { handleError, handleSuccess } from '../Components/ErrorMessage';
import { Users, Check, X, User, Clock, Briefcase, ChevronRight, Trash2, ArrowLeft, AlertTriangle } from 'lucide-react';
import '../styles/hackthonpost.css'
// --- NORMAL CSS ---
const customStyles = `
.btn-reject,
  .btn-delete-post {
      background: transparent;
      color: var(--danger);
      border: 1px solid var(--danger-bg);
  }
        .btn-delete-post {
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

  .btn-delete-post:hover {
      background: var(--danger);
      color: #fff;
      border-color: var(--danger);
  }
        .btn-delete-post:hover {
      background: var(--danger, #ef4444);
      color: #fff;
      border-color: var(--danger, #ef4444);
  }

  /* --- MODAL CSS --- */
  .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(4px);
  }
  .modal-content {
      background: var(--bg-card, #ffffff);
      padding: 24px;
      border-radius: 12px;
      width: 90%;
      max-width: 450px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      color: var(--text-dark, #1f2937);
  }
  .modal-header {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--danger, #ef4444);
      margin-bottom: 16px;
  }
  .modal-header h3 { margin: 0; font-size: 1.25rem; }
  .modal-warning {
      font-size: 0.95rem;
      margin-bottom: 20px;
      line-height: 1.5;
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
  }
  .modal-input {
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      width: 100%;
      font-size: 0.95rem;
      background: transparent;
      color: inherit;
  }
  .modal-input:focus {
      outline: none;
      border-color: var(--danger, #ef4444);
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }
  .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
  }
  .btn-modal-cancel {
      padding: 8px 16px;
      border: 1px solid #d1d5db;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: inherit;
  }
  .btn-modal-cancel:hover { background: #f3f4f6; color: #111827; }
  .btn-modal-delete {
      padding: 8px 16px;
      border: none;
      background: var(--danger, #ef4444);
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: opacity 0.2s;
  }
  .btn-modal-delete:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
`;

// --- SKELETON COMPONENT ---
const SkeletonPost = () => (
    <div className="post-card">
        <div className="post-card-header">
            <div style={{ width: '100%' }}>
                <div className="skeleton sk-title"></div>
                <div className="skeleton sk-meta"></div>
                <div className="skills-container">
                    <div className="skeleton sk-tag"></div>
                    <div className="skeleton sk-tag"></div>
                    <div className="skeleton sk-tag"></div>
                </div>
            </div>
        </div>
        <div className="applicants-section">
            <div className="skeleton sk-meta" style={{ width: '150px' }}></div>
            <div className="skeleton sk-row"></div>
            <div className="skeleton sk-row"></div>
        </div>
    </div>
);

export default function PostHackthon() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loder, setLoder] = useState(false)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [deleteInputText, setDeleteInputText] = useState("");
    const [isDeleteChecked, setIsDeleteChecked] = useState(false);

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

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/user-hackthon-posts-with-applicants`;
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
    // 1. Opens the Modal and sets the target post
    const initiateDeletePost = (post) => {
        setPostToDelete(post);
        setDeleteInputText("");
        setIsDeleteChecked(false);
        setDeleteModalOpen(true);
    };

    // 2. Closes Modal without doing anything
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setPostToDelete(null);
        setDeleteInputText("");
        setIsDeleteChecked(false);
    };

    // 3. Final action that actually deletes
    const confirmDeletePost = async () => {
        if (!postToDelete) return;

        // Double check validations just in case
        if (!isDeleteChecked || deleteInputText !== postToDelete.hackthonName) {
            return;
        }

        const postId = postToDelete._id;
        console.log("Deleting post ID:", postId);

        try {
            // TODO: Call your backend API here
            setLoder(true)
            const token = await user?.getIdToken();
            const localtoken = secureLocalStorage.getItem('auth-token');
            let headers = { "Content-Type": "application/json" };
            if (localtoken) {
                headers["auth-token"] = localtoken;
            } else if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/delete-hackthon/${postId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            });
            handleSuccess('Delete Successful')
            // Optimistic UI update: Remove the post from the screen immediately
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

            // Close the modal after successful deletion
            closeDeleteModal();
        } catch (error) {
            console.error("Failed to delete", error);
            handleError("Failed to delete the post.");
        }
        finally {
            setLoder(false)
        }
    };


    // --- Handlers for Actions ---
    const handleViewProfile = (applicantId) => {
        console.log("Navigating to profile:", applicantId);
        navigate(`/profile/${applicantId}`);
    };

    const handleAccept = async (applicationId, postId) => {
        console.log("Accepting application:", applicationId);
        // TODO: Add backend API call to update status to "accepted"
    };

    const handleReject = async (applicationId, postId) => {
        console.log("Rejecting application:", applicationId);
        // TODO: Add backend API call to update status to "rejected"
    };

    const handleDeletePost = (postId) => {
        console.log(postId)
    }
    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <>
            <style>{customStyles}</style>
            {deleteModalOpen && postToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <AlertTriangle size={24} />
                            <h3>Delete Hackthon Post</h3>
                        </div>

                        <p className="modal-warning">
                            Are you sure you want to delete <strong>{postToDelete.hackthonName}</strong>?
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
                                Please type <strong>{postToDelete.hackthonName}</strong> to confirm:
                            </label>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder={postToDelete.hackthonName}
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
                                disabled={!isDeleteChecked || deleteInputText !== postToDelete.hackthonName}
                            >
                                {loder ? <span className="loader-gg"></span> : "Final Delete"}
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
                    <h1 className="header-title">Manage <span>Applicants</span></h1>
                    <p className="header-subtitle">Review and manage the developers applying to your hackathon posts.</p>
                </div>

                <div className="posts-list">
                    {loading ? (
                        // Show Skeletons
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    ) : posts.length > 0 ? (
                        // Render Actual Posts
                        posts.map((post) => (
                            <div key={post._id} className="post-card">

                                {/* Post Details Header */}
                                <div className="post-card-header">
                                    <div className="post-info">
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h3>{post.hackthonName}</h3>
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
                                                <Briefcase size={16} /> {post.hackthonProblemCategory}
                                            </span>
                                            <span className="post-meta-item">
                                                <Users size={16} /> {post.applications?.length || 0} Applicants
                                            </span>
                                        </div>
                                        <div className="skills-container">
                                            {post.RequiredSkills?.map((skill, idx) => (
                                                <span key={idx} className="skill-badge">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Applicants List */}
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

                                                        {/* Only show Accept/Reject if status is pending */}
                                                        {app.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    className="btn btn-accept"
                                                                    onClick={() => handleAccept(app._id, post._id)}
                                                                >
                                                                    <Check size={14} /> Accept
                                                                </button>
                                                                <button
                                                                    className="btn btn-reject"
                                                                    onClick={() => handleReject(app._id, post._id)}
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
                        // Empty State
                        <div className="empty-state">
                            <Briefcase size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <h3>No Hackathon Posts Found</h3>
                            <p>You haven't created any requirements or posts yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}