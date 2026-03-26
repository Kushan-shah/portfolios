import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, Globe, X, ChevronRight, Code2, Target, CheckCircle2 } from 'lucide-react';
import './Projects.css';

const projectData = [
  {
    id: '01',
    category: 'PREDICTIVE MODELING',
    title: 'Real Estate Price Intelligence',
    description: 'A regression ecosystem trained on multi-dimensional property data to automate real estate valuation.',
    overview: 'An end-to-end Machine Learning pipeline that predicts property valuations, mitigating pricing ambiguity in volatile housing markets.',
    problem: 'Traditional property valuation is a manual, high-latency process that consistently fails to capture non-linear geographical and structural nuances.',
    impact: 'Replaces intuition-based estimates with a purely quantitative framework, giving stakeholders instant, data-driven pricing metrics.',
    architecture: [
      'Executed rigorous Exploratory Data Analysis (EDA) to isolate high-variance predictors.',
      'Benchmarked Multiple Linear Regression against Decision Trees and Random Forests.',
      'Fine-tuned model parameters utilizing GridSearchCV, prioritizing R² score maximization.',
      'Embedded the inference engine within a Streamlit application for low-latency assessment.'
    ],
    techDetails: ['Python', 'Scikit-learn', 'Pandas', 'GridSearchCV', 'Matplotlib', 'Streamlit'],
    tags: ['Python', 'Regression Modeling', 'Matplotlib', 'Scikit-learn', 'Streamlit'],
    bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://github.com/Kushan-shah/houseprice',
    demoUrl: 'https://houseprice-4dky.onrender.com/'
  },
  {
    id: '02',
    category: 'CLASSIFICATION ARCHITECTURE',
    title: 'Student Dropout Predictor',
    description: 'An ML classification model handling class imbalance to predict student dropout. Achieved an F1-score of ~82% via SMOTE and cross-validation.',
    overview: 'A predictive classification architecture designed to identify at-risk students early, equipping institutions with data to intervene proactively.',
    problem: 'Raw institutional data is highly imbalanced (skewed heavily towards non-dropouts) and spans multiple categorical dimensions, making manual multi-variate risk identification unreliable.',
    impact: 'Demonstrates practical capabilities in mitigating severe class imbalances and establishes an automated early-warning system with direct socio-educational retention impact.',
    architecture: [
      'Implemented Synthetic Minority Over-sampling Technique (SMOTE) to balance the skewed dataset, preventing algorithmic bias.',
      'Utilized K-Fold Cross-Validation to validate model integrity against overfitting.',
      'Benchmarked Logistic Regression against Random Forests, configuring tree depths via RandomizedSearchCV.',
      'Achieved a rigorous F1-score of ~82%, integrating the final inference pipeline into a clean Streamlit UI.'
    ],
    techDetails: ['Python', 'Random Forest', 'SMOTE', 'Scikit-learn', 'K-Fold CV', 'Streamlit'],
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Logistic Regression', 'Random Forest', 'SMOTE', 'Streamlit'],
    bgImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://github.com/Kushan-shah/studentdropout',
    demoUrl: 'https://studentdropout-tdce.onrender.com/'
  }
];

const Projects = () => {
  const cardRefs = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  // Magnetic hover displacement — card subtly repels from cursor
  const handleMouseMove = useCallback((e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Magnetic displacement (card moves AWAY from cursor — premium feel)
    const displaceX = ((x - centerX) / centerX) * -8;
    const displaceY = ((y - centerY) / centerY) * -6;

    card.style.transform = `translate(${displaceX}px, ${displaceY}px)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'translate(0, 0)';
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-layout">
        
        <div className="projects-header">
          <div className="sticky-header scroll-reveal">
            <p className="section-subtitle text-mono">02 // WORK</p>
            <h2 className="section-title">PROJECTS</h2>
            <div className="title-underline"></div>
          </div>
        </div>

        <div className="projects-grid">
          {projectData.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card scroll-reveal"
              ref={el => cardRefs.current[index] = el}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Cursor-tracking light scope */}
              <div className="card-glow-effect"></div>
              {/* Noise grain overlay */}
              <div className="noise-grain"></div>

              <div 
                className="project-bg" 
                style={{ backgroundImage: `url(${project.bgImage})` }}
              ></div>
              <div className="project-overlay"></div>
              
              <div className="project-content">
                <div className="project-top-row">
                  <div className="project-number text-mono">{project.id}</div>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="live-badge text-mono">
                      <span className="live-dot"></span>
                      LIVE
                      <Globe size={12} />
                    </a>
                  )}
                </div>
                
                <div className="project-info">
                  <p className="project-category text-mono text-accent">{project.category}</p>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, tagIdx) => (
                      <span 
                        key={tag} 
                        className="tag text-mono"
                        style={{ transitionDelay: `${tagIdx * 40}ms` }}
                      >{tag}</span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {project.sourceUrl && (
                      <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="project-link-btn source-btn text-mono">
                        <span>GITHUB</span>
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" className="project-link-btn demo-btn text-mono">
                        <span>LIVE</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="project-link-btn read-more-btn text-mono"
                    >
                      <span>READ MORE</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* Modern Glassmorphic Project Details Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <span className="modal-category text-mono text-accent">{selectedProject.category}</span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-overview">{selectedProject.overview}</p>
            </div>
            
            <div className="modal-body">
              <div className="modal-grid">
                
                {/* Left Column */}
                <div className="modal-col">
                  <div className="modal-section modal-animate-in" style={{animationDelay: '0.1s'}}>
                    <h3><Target size={18} className="text-accent" /> THE PROBLEM</h3>
                    <p>{selectedProject.problem}</p>
                  </div>
                  
                  <div className="modal-section modal-animate-in" style={{animationDelay: '0.2s'}}>
                    <h3><CheckCircle2 size={18} className="text-accent" /> BUSINESS IMPACT</h3>
                    <p>{selectedProject.impact}</p>
                  </div>

                  <div className="modal-tech-stack modal-animate-in" style={{animationDelay: '0.3s'}}>
                    <div className="tech-header">
                      <Code2 size={18} className="text-accent" />
                      <h3 className="text-mono m-0">TECHNICAL STACK</h3>
                    </div>
                    <div className="modal-tags">
                      {selectedProject.techDetails.map(tech => (
                        <span key={tech} className="modal-tag text-mono">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="modal-col">
                  <div className="modal-section modal-animate-in architecture-section" style={{animationDelay: '0.25s'}}>
                    <h3><span className="text-accent text-mono">{'//'}</span> ARCHITECTURE & PROCESS</h3>
                    <ul className="architecture-list">
                      {selectedProject.architecture.map((step, i) => (
                        <li key={i}>
                          <span className="bullet-point"></span>
                          <span className="bullet-text">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="modal-footer">
              <a href={selectedProject.sourceUrl} target="_blank" rel="noreferrer" className="project-link-btn source-btn text-mono">
                <span>VIEW CODE</span>
                <ArrowUpRight size={16} />
              </a>
              {selectedProject.demoUrl && (
                <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="project-link-btn demo-btn text-mono">
                  <span>LIVE DEMO</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
