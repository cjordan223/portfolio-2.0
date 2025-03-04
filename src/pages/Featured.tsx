import React, { useState, useMemo } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Featured.css';

interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  image?: string;
  path?: string;
  site?: string;
}

const Featured: React.FC = () => {
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

  // Memoize just the featured projects
  const featuredProjects = useMemo(() => [
    {
      name: "PhishFinder",
      category: "featured",
      tags: ["Vue.js", "OAuth 2.0", "API Integration", "Security"],
      description: "PhishFinder is a web extension designed to enhance email security by identifying and flagging phishing and spearphishing patterns. Built using Vue.js and integrating with Gmail's API through OAuth 2.0, it provides real-time security analysis of incoming emails.",
      image: "/img/phishfinderlogo.png",
      path: "https://github.com/connerjordan/phishfinder",
    },
    {
      name: "Portfolio Website",
      category: "featured",
      tags: ["React", "TypeScript", "Framer Motion", "CSS"],
      description: "A complete redesign of my personal portfolio using React, TypeScript, and Framer Motion. Features a custom terminal interface, animated transitions, and responsive design principles.",
      image: "/img/portfolio.png",
      path: "https://github.com/connerjordan/portfolio-2.0",
    },
    {
      name: "Flashcards App",
      category: "featured",
      tags: ["Swift", "iOS", "UI/UX Design"],
      description: "I'm working on my Capstone project and studying for CompTIA, but still want to make time for personal projects, so I created flashcards in Swift to test in the iOS/XCode environment. It was surprisingly easy, with Swift having a lot of similarites to the React component structure.",
      image: "/img/flashcard.png",
      path: "https://github.com/connerjordan/flashcards-swift",
    }
  ], []);

  // Function to toggle project expansion
  const toggleProject = (projectName: string) => {
    if (expandedProject === projectName) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectName);
    }
  };

  return (
    <div className="featured-page" style={{ backgroundColor: theme.background }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        Featured Projects
      </motion.h1>

      <motion.p 
        className="page-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: theme.text }}
      >
        Highlighted projects representing my best and most impactful work
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
              backgroundColor: category.id === 'featured' ? theme.primary : 'transparent',
              color: category.id === 'featured' ? theme.cardBackground : theme.text,
              borderColor: theme.border
            }}
            onClick={() => {
              if (category.id === 'client') {
                navigate('/client-work');
              } else if (category.id === 'datascience') {
                navigate('/data-science');
              } else if (category.id === 'webapps') {
                navigate('/web-apps');
              } else if (category.id === 'education') {
                navigate('/education');
              } else {
                navigate('/featured');
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Featured Projects Carousel */}
      <div className="featured-carousel">
        {featuredProjects.map((project, index) => (
          <motion.div 
            key={project.name}
            className="featured-project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            style={{ 
              backgroundColor: theme.cardBackground,
              color: theme.text,
              borderColor: theme.border
            }}
          >
            {project.image && (
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="project-image"
                />
              </div>
            )}
            
            <div className="project-content">
              <h3 className="project-title" style={{ color: theme.primary }}>{project.name}</h3>
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
              
              <div className="project-actions">
                {project.path && (
                  <a 
                    href={project.path} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="github-btn"
                    style={{ 
                      borderColor: theme.border,
                      color: theme.text
                    }}
                  >
                    GitHub Code
                  </a>
                )}
                
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
                    View Details
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Back to main projects button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="back-btn-container"
      >
        <button
          className="main-projects-btn"
          onClick={() => navigate('/projects')}
          style={{ 
            backgroundColor: 'transparent',
            color: theme.text,
            borderColor: theme.border
          }}
        >
          Main Projects Page
        </button>
      </motion.div>
    </div>
  );
};

export default Featured; 