import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  Code2, 
  ExternalLink, 
  Activity, 
  FolderGit2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  CalendarDays 
} from 'lucide-react';

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
  }

  .my-applications-container {
    background-color: var(--bg-main);
    min-height: 100vh;
    margin-top: 50px;
    padding: 40px 20px;
    color: var(--text-main);
    font-family: system-ui, -apple-system, sans-serif;
  }

  .page-header {
    max-width: 1200px;
    margin: 0 auto 30px auto;
  }

  .page-title {
    font-size: 2rem;
    color: var(--text-main);
    margin: 0 0 8px 0;
  }

  .page-subtitle {
    color: var(--text-muted);
    margin: 0;
  }

  .highlight {
    color: var(--primary);
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Card Styles */
  .app-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: transform 0.2s, border-color 0.2s;
    height: 100%;
  }

  .app-card:hover {
    border-color: var(--border-primary);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .card-title-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .card-type-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--primary);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .card-title {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
    color: var(--text-main);
    line-height: 1.3;
  }

  .time-ago-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: var(--bg-input);
    border: 1px solid var(--border-input);
    color: var(--text-muted);
    white-space: nowrap;
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .info-link {
    color: var(--primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }

  .info-link:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  .skills-section {
    padding-top: 16px;
    border-top: 1px solid var(--border-light);
    margin-bottom: 8px;
  }

  .skills-title {
    font-size: 0.85rem;
    color: var(--text-dark);
    margin: 0 0 10px 0;
  }

  .tags-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-badge {
    background-color: var(--bg-input);
    color: var(--text-muted);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    border: 1px solid var(--border-input);
  }

  /* Status Footer Box */
  .status-footer {
    margin-top: auto; /* Pushes the box to the very bottom */
    padding: 14px 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 6px;
    border: 1px solid transparent;
  }

  .status-footer-header {
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-footer-message {
    font-size: 0.85rem;
    opacity: 0.9;
    line-height: 1.4;
  }

  /* Dynamic Status Colors */
  .status-footer.pending {
    background-color: rgba(255, 195, 0, 0.1);
    border-color: rgba(255, 195, 0, 0.3);
    color: #FFC300;
  }
  
  .status-footer.accepted {
    background-color: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.3);
    color: #22c55e;
  }

  .status-footer.rejected {
    background-color: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }

  /* Skeleton Animations */
  .skeleton {
    background: var(--border-light);
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
  }
  @keyframes pulse {
    0% { background-color: var(--border-light); }
    50% { background-color: var(--border-input); }
    100% { background-color: var(--border-light); }
  }
  .skeleton-title { height: 24px; width: 70%; }
  .skeleton-badge { height: 28px; width: 100px; border-radius: 20px; }
  .skeleton-text { height: 16px; width: 100%; }
  .skeleton-text-short { height: 16px; width: 50%; }
  .skeleton-tag { height: 26px; width: 70px; border-radius: 6px; }
  .skeleton-footer { height: 60px; width: 100%; border-radius: 8px; margin-top: auto; }
`;

// --- SKELETON COMPONENT ---
const SkeletonApplicationCard = () => (
  <div className="app-card">
    <div className="card-header">
      <div className="card-title-group" style={{ width: '100%' }}>
        <div className="skeleton skeleton-text-short" style={{ width: '30%', marginBottom: '6px' }}></div>
        <div className="skeleton skeleton-title"></div>
      </div>
      <div className="skeleton skeleton-badge"></div>
    </div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text-short"></div>
    <div className="skills-section">
      <div className="tags-flex">
        <div className="skeleton skeleton-tag"></div>
        <div className="skeleton skeleton-tag" style={{ width: '90px' }}></div>
      </div>
    </div>
    <div className="skeleton skeleton-footer"></div>
  </div>
);

// --- HELPER FUNCTIONS ---
const getDaysAgo = (dateString) => {
  if (!dateString) return "Date unknown";
  const date = new Date(dateString);
  const now = new Date();
  
  // Calculate difference in time
  const diffTime = Math.abs(now - date);
  // Calculate difference in days
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Applied today";
  if (diffDays === 1) return "Applied 1 day ago";
  return `Applied ${diffDays} days ago`;
};

const getStatusConfig = (status) => {
  const lowerStatus = status?.toLowerCase() || 'pending';
  
  switch (lowerStatus) {
    case 'accepted':
      return {
        className: 'accepted',
        title: 'Accepted',
        message: 'Congratulations! You have been selected for this program.',
        icon: <CheckCircle size={20} />
      };
    case 'rejected':
      return {
        className: 'rejected',
        title: 'Rejected',
        message: 'Unfortunately, your application was not selected this time.',
        icon: <XCircle size={20} />
      };
    case 'pending':
    default:
      return {
        className: 'pending',
        title: 'Pending',
        message: 'Please wait, the team will review and give a response soon.',
        icon: <Clock size={20} />
      };
  }
};

export default function UserApplication() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationData = async () => {
      setLoading(true);
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

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/user-all-application`;
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        if (data.success) {
          setApplications(data.data.reverse());
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [user]);

  return (
    <>
      <style>{customStyles}</style>
      <div className="my-applications-container">
        
        <header className="page-header">
          <h1 className="page-title">My <span className="highlight">Applications</span></h1>
          <p className="page-subtitle">Track the status of the hackathons and projects you've applied to.</p>
        </header>

        <div className="grid-container">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonApplicationCard key={index} />
            ))
          ) : applications.length > 0 ? (
            applications.map((app) => {
              const isHackathon = app.eventModel === "RequirmentHackthon";
              const details = app.eventDetails;

              const title = isHackathon ? details.hackthonName : details.ProjectTitle;
              const typeLabel = isHackathon ? "Hackathon" : "Project";
              const TypeIcon = isHackathon ? Code2 : FolderGit2;
              const categoryOrType = isHackathon ? details.hackthonProblemCategory : details.ProjectType;
              const skills = details.RequiredSkills || [];
              
              const statusConfig = getStatusConfig(app.status);

              return (
                <div key={app._id} className="app-card">
                  
                  <div className="card-header">
                    <div className="card-title-group">
                      <span className="card-type-label">
                        <TypeIcon size={14} /> {typeLabel}
                      </span>
                      <h3 className="card-title">{title}</h3>
                    </div>
                    {/* Time Ago replaces the old pending badge */}
                    <div className="time-ago-badge">
                      <CalendarDays size={14} />
                      {getDaysAgo(app.createdAt)}
                    </div>
                  </div>

                  <div className="info-row">
                    <Briefcase size={16} />
                    <span>{categoryOrType}</span>
                  </div>

                  <div className="info-row">
                    {isHackathon && details.hackthonWebsiteLink ? (
                      <a href={details.hackthonWebsiteLink} target="_blank" rel="noopener noreferrer" className="info-link">
                        <ExternalLink size={16} /> Website Link
                      </a>
                    ) : !isHackathon && details.ProjectStatus ? (
                      <>
                        <Activity size={16} />
                        <span>Status: {details.ProjectStatus}</span>
                      </>
                    ) : null}
                  </div>

                  <div className="skills-section">
                    <h4 className="skills-title">Required Skills</h4>
                    <div className="tags-flex">
                      {skills.map((skill, index) => (
                        <span key={index} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* New Highlighted Status Footer Block */}
                  <div className={`status-footer ${statusConfig.className}`}>
                    <div className="status-footer-header">
                      {statusConfig.icon}
                      {statusConfig.title}
                    </div>
                    <div className="status-footer-message">
                      {statusConfig.message}
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div style={{ color: 'var(--text-muted)', padding: '20px 0' }}>
              You haven't applied to any projects or hackathons yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}