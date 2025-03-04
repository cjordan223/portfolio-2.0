import React, { useState, useMemo } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './ClientWork.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  image?: string;
  path?: string;
  site?: string;
}

const ClientWork: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  // Categories for the filter buttons - same as in Projects.tsx
  const categories = [
    { id: 'featured', name: 'Featured' },
    { id: 'webapps', name: 'Web Apps' },
    { id: 'datascience', name: 'Data Science' },
    { id: 'education', name: 'Education' },
    { id: 'client', name: 'Client Work' },
  ];

  // Memoize just the client projects
  const clientProjects = useMemo(() => [
    {
      name: "Sprague Pavers",
      category: "client",
      tags: ["Web Design", "CMS", "Small Business"],
      description: "Paving Contractor website built with a custom CMS solution. Created a responsive design that showcases their services and portfolio of work.",
      image: "/img/sprague.png",
      site: "https://www.espraguepavingandsons.net/",
    },
    {
      name: "Lane's LLC",
      category: "client",
      tags: ["Web Design", "CMS", "Construction"],
      description: "General Contractor website with service listings, portfolio, and contact functionality. Designed to attract new business and showcase completed projects.",
      image: "/img/Lanes.png",
      site: "https://www.lanesconstructionky.com/",
    },
    {
      name: "Amendola Storage",
      category: "client",
      tags: ["Web Design", "CMS", "Storage Services"],
      description: "Storage Service website with facility information, pricing, and online booking capabilities. Includes image galleries of storage units.",
      image: "/img/Storage.png",
      site: "https://www.amendolastorage.com/",
    },
    {
      name: "Lone Oak Baptist",
      category: "client",
      tags: ["Web Design", "CMS", "Non-Profit"],
      description: "Baptist Church website featuring service times, event calendar, sermon archives, and community outreach information.",
      image: "/img/LO.png",
      site: "https://www.loneoakbaptistsnook.org/",
    },
    {
      name: "Carpentry Solutions",
      category: "client",
      tags: ["Web Design", "CMS", "Small Business"],
      description: "Custom website development for a carpentry and woodworking business, featuring portfolio of completed projects and contact forms.",
      image: "/img/LO.png",
      site: "https://www.carpentrysolutionsinfo.com/",
    },
  ], []);

  const toggleProject = (projectName: string) => {
    if (expandedProject === projectName) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectName);
    }
  };

  return (
    <div className="client-work-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        Client Work
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="page-description"
      >
        Collection of web design and development projects for various clients
      </motion.p>

      {/* Category navigation */}
      <motion.div
        className="category-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map(category => (
          <button
            key={category.id}
            className="category-btn"
            style={{ 
              backgroundColor: category.id === 'client' ? theme.primary : 'transparent',
              color: category.id === 'client' ? theme.cardBackground : theme.text,
              borderColor: theme.border
            }}
            onClick={() => {
              if (category.id === 'datascience') {
                navigate('/data-science');
              } else if (category.id === 'webapps' || category.id === 'education') {
                navigate('/projects', { state: { activeCategory: category.id } });
              } else {
                navigate('/client-work');
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      <div className="dropdown-list">
        {clientProjects.map((project, index) => (
          <div key={index} className="dropdown-project">
            <div 
              className="dropdown-header"
              onClick={() => toggleProject(project.name)}
              style={{ 
                borderColor: theme.border,
                color: theme.text,
                backgroundColor: theme.cardBackground
              }}
            >
              <span>{project.name}</span>
              <span className="dropdown-arrow">
                {expandedProject === project.name ? '▲' : '▼'}
              </span>
            </div>
            
            {expandedProject === project.name && (
              <motion.div 
                className="dropdown-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ backgroundColor: theme.cardBackground }}
              >
                <div className="project-details">
                  {project.image && (
                    <div className="project-image-container">
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="project-image"
                      />
                    </div>
                  )}
                  
                  <div className="project-info">
                    <p className="project-description">{project.description}</p>
                    
                    <div className="tags-container">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="tag"
                          style={{ 
                            borderColor: theme.border,
                            color: theme.text
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {project.site && (
                      <a 
                        href={project.site} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="visit-site-btn"
                        style={{ 
                          backgroundColor: theme.accent,
                          color: 'white'
                        }}
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <Link 
        to="/projects" 
        className="main-projects-btn"
        style={{ 
          borderColor: theme.primary,
          color: theme.primary
        }}
      >
        Main Projects Page
      </Link>
    </div>
  );
};

export default ClientWork; 