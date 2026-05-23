import React, { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, ChevronRight, Code2, Briefcase, Zap, Globe, X } from 'lucide-react';
import '../styles/viewallreqirment.css'
import { handleError, handleSuccess } from '../Components/ErrorMessage';
import secureLocalStorage from 'react-secure-storage';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

// --- NORMAL CSS ---
const customStyles = `
  /* Skeleton Animation Styles */

  /* Modal Styles */
`;

// --- COMPONENTS ---

const Badge = ({ children, outline = false }) => {
  return (
    <span className={`badge ${outline ? 'badge-outline' : 'badge-solid'}`}>
      {children}
    </span>
  );
};

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="card">
    <div className="card-header">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-icon"></div>
    </div>

    <div className="card-section">
      <div className="skeleton skeleton-text-short"></div>
      <div className="skeleton skeleton-text"></div>
    </div>

    <div className="card-section flex-grow">
      <div className="skeleton skeleton-text-short"></div>
      <div className="tags-flex">
        <div className="skeleton skeleton-tag"></div>
        <div className="skeleton skeleton-tag" style={{ width: '80px' }}></div>
      </div>
    </div>

    <div className="skeleton skeleton-btn"></div>
  </div>
);

export default function ViewAllRequirment() {
  const [view, setView] = useState('list'); // 'list' or 'details'
  const [selectedProject, setSelectedProject] = useState(null);
  const [hackthonData, setHackthonData] = useState([]);
  const { user } = useAuth()
  const [valueOfApply, setValueOfApply] = useState('')
  // Loading State
  const [loading, setLoading] = useState(true);
  const [loader, setLoder] = useState(false)
  const [isapplyloder, setIsapplyloder] = useState(true)
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasConfirmedSkills, setHasConfirmedSkills] = useState(false);


  const naviget= useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/all-hackthon-requirment`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setHackthonData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("server issue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = async (project) => {
    const token = await user?.getIdToken();
    const localtoken = secureLocalStorage.getItem('auth-token');
    if(!token && !localtoken) {
        handleError('Login Frist')
        return naviget('/login')
    };
    setSelectedProject(project);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {

      setIsapplyloder(true)
      // Log the required ID for the backend call
      if (localtoken) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/isApply/${project._id}`
        const responce = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localtoken
          },
        });
        const data = await responce.json()
        // console.log(data)
        if (!data.status) {
          return setValueOfApply('Apply as Partner')
        }
        return setValueOfApply('Already applied')


      }
      if (token) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/isApply/${project._id}`
        const responce = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        const data = await responce.json()
        // console.log(data)
        if (!data.status) {
          return setValueOfApply('Apply as Partner')
        }
        return setValueOfApply('Already applied')

      }
    } catch (error) {
      console.log(error);
      return handleError('Network Issue try again')
    }
    finally {
      setIsapplyloder(false)
    }
    
  };

  const handleBack = () => {
    setView('list');
    setSelectedProject(null);
  };

  // Modal Handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setHasConfirmedSkills(false); // Reset checkbox when opening
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplySubmit = async () => {
    if (selectedProject && hasConfirmedSkills) {
      const token = await user?.getIdToken();
      const localtoken = secureLocalStorage.getItem('auth-token');
      try {

        setLoder(true)
        // Log the required ID for the backend call
        if (localtoken) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/hackthon-application`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localtoken
            },
            body: JSON.stringify({ eventId: selectedProject._id })
          });
          const data = await responce.json()
          if (!data.status) {
            return handleError('Network issue try again!')

          }
          handleSuccess('Application Submitted')

        }
        if (token) {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/hackthon-application`
          const responce = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ eventId: selectedProject._id })
          });
          const data = await responce.json()
          if (!data.status) {
            return handleError('Network issue try again!')

          }
          handleSuccess('Application Submitted')
        }


        // TODO: Make your backend API call here using selectedProject._id

        // Close modal after submission
        handleViewDetails(selectedProject)
        handleCloseModal();
      } catch (error) {
        console.log(error);
        return handleError('Network Issue try again')
      }
      finally {
        setLoder(false)
      }
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="app-container">

        <main className="main-content">
          {view === 'list' && (
            <div className="fade-in-up">
              <div className="hero-section">
                <h2 className="hero-title">
                  DISCOVER YOUR <span className="hero-highlight">NEXT BUILD TEAM</span><br />
                  
                </h2>
                <p className="hero-subtitle">
                   Connect with developers, designers, and innovators looking for their next great project.
                </p>
              </div>

              <div className="grid-container">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                ) : (
                  hackthonData.map((project) => (
                    <div key={project._id} className="card">
                      <div className="card-header">
                        <h3 className="card-title">{project.hackthonName}</h3>
                       <a href={`${project.hackthonWebsiteLink}`} target='_blank'>  <div className="icon-box">
                          <Globe  size={20} />
                        </div></a>
                      </div>

                      <div className="card-section">
                        <p className="card-label">
                          <Globe size={16} /> Category
                        </p>
                        <p className="card-value">{project.hackthonProblemCategory}</p>
                      </div>

                      <div className="card-section flex-grow">
                        <p className="card-label">
                          <Zap size={16} /> Required Skills
                        </p>
                        <div className="tags-flex">
                          {project.RequiredSkills.map((skill, index) => (
                            <Badge key={index} outline>{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <button className="card-btn" onClick={() => handleViewDetails(project)}>
                       CONNECT NOW 
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'details' && selectedProject && (
            <div className="details-wrapper fade-in-right">
              <button className="back-btn" onClick={handleBack}>
                <div className="icon-box">
                  <ArrowLeft size={16} />
                </div>
                <span className="back-text">Back to Projects</span>
              </button>

              <div className="details-card">
                <div className="gradient-line"></div>

                <div className="details-content">
                  <div className="details-header">
                    <div>
                      <h2 className="details-title">{selectedProject.hackthonName}</h2>
                      <Badge>{selectedProject.hackthonProblemCategory}</Badge>
                    </div>

                    <a
                      href={selectedProject.hackthonWebsiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-btn"
                    >
                      <ExternalLink size={20} />
                      Visit Project Site
                    </a>
                  </div>

                  <div className="details-body">
                    <div className="details-main-col">
                      <section>
                        <h3 className="section-title">
                          <span className="section-icon-box">
                            <Briefcase size={20} />
                          </span>
                          Problem Statement
                        </h3>
                        <p className="section-text">{selectedProject.hackthonProblemStatement}</p>
                      </section>

                      <section>
                        <h3 className="section-title">
                          <span className="section-icon-box">
                            <Zap size={20} />
                          </span>
                          Project Idea / Solution
                        </h3>
                        <p className="section-text">{selectedProject.hackthonProjectIdea}</p>
                      </section>
                    </div>

                    <div className="details-sidebar">
                      <div>
                        <h3 className="sidebar-heading">Required Skills</h3>
                        <div className="tags-flex">
                          {selectedProject.RequiredSkills.map((skill, index) => (
                            <Badge key={`req-${index}`} outline>{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="sidebar-divider">
                        <h3 className="sidebar-heading">
                          <Code2 size={16} /> Tech Stack
                        </h3>
                        <div className="tags-flex">
                          {selectedProject.AllTechStack.map((tech, index) => (
                            <span key={`tech-${index}`} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="apply-footer">
                    {/* Trigger Modal Open here */}
                    <button className="apply-btn" disabled={valueOfApply==='Already applied'} onClick={handleOpenModal}>
                      {isapplyloder?<span className="loader-gg"></span> :valueOfApply}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- APPLICATION MODAL --- */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content fade-in-up">

            <div className="modal-header">
              <h3 className="modal-title">Apply for Partner</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-skills-box">
              <h4>Required Skills for {selectedProject.hackthonName}</h4>
              <div className="tags-flex">
                {selectedProject.RequiredSkills.map((skill, index) => (
                  <Badge key={`modal-req-${index}`} outline>{skill}</Badge>
                ))}
              </div>
            </div>

            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={hasConfirmedSkills}
                onChange={(e) => setHasConfirmedSkills(e.target.checked)}
              />
              <span className="checkbox-text">
                I confirm that I have proficiency in the required skills listed above and am ready to contribute to this project.
              </span>
            </label>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn-confirm"
                disabled={!hasConfirmedSkills}
                onClick={handleApplySubmit}
              >
                {loader ? <span className="loader"></span> : 'Confirm Application'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}