import React, { useState, useMemo } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Education.css';

interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  image?: string;
  path?: string;
  site?: string;
}

const Education: React.FC = () => {
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

  // Memoize just the education projects
  const educationProjects = useMemo(() => [
    {
      name: "CST 300: Major ProSeminar",
      category: "education",
      tags: ["Academic Research", "Technical Writing", "Ethics"],
      description: "Overview of the Computer Science and Communication Design disciplines. Students develop a comprehensive academic plan, research career opportunities, and prepare for their academic pathway.",
      image: "https://csumb.edu/media/csumb/images-body-default/cs-image.jpeg",
      site: "/course/cst300"
    },
    {
      name: "CST 338: Software Design",
      category: "education",
      tags: ["Java", "OOP", "Design Patterns"],
      description: "Introduction to software design with a focus on object-oriented design patterns. Includes practical application of design patterns in Java programming.",
      image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190501121513/GFG-10.png",
      site: "/course/cst338"
    },
    {
      name: "CST 438: Software Engineering",
      category: "education",
      tags: ["Full Stack", "Agile", "Team Development"],
      description: "Covers key knowledge of software engineering practices.",
      image: "https://cdn.sanity.io/images/tlr8oxjg/production/8065e9b35afcf58ba7b1b96e1d5be14420d47dec-1456x816.png?w=3840&q=100&fit=clip&auto=format",
      site: "/course/cst438"
    },
    {
      name: "CST 329: Reasoning with Logic",
      category: "education",
      tags: ["Logic", "Critical Thinking", "Problem Solving"],
      description: "In this course, students learn to develop skill in using logic to describe and assess arguments.",
      image: "https://media.geeksforgeeks.org/wp-content/uploads/20240624022022/Propositional-Logic.webp",
      site: "/course/cst329"
    },
    {
      name: "CST 499: Directed Capstone",
      category: "education",
      tags: ["Vue.js", "Security", "OAuth", "Capstone"],
      description: "The culmination of CST 489 planning and development into a significant software project.",
      image: "/img/phishfinderlogo.png",
      site: "/course/cst499"
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
    <div className="education-page" style={{ backgroundColor: theme.background }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        Education Projects
      </motion.h1>

      <motion.p 
        className="page-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: theme.text }}
      >
        Academic projects and coursework showcasing my educational journey
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
              backgroundColor: category.id === 'education' ? theme.primary : 'transparent',
              color: category.id === 'education' ? theme.cardBackground : theme.text,
              borderColor: theme.border
            }}
            onClick={() => {
              if (category.id === 'client') {
                navigate('/client-work');
              } else if (category.id === 'datascience') {
                navigate('/data-science');
              } else if (category.id === 'webapps') {
                navigate('/web-apps');
              } else if (category.id === 'featured') {
                navigate('/featured');
              } else {
                navigate('/education');
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Education Projects Dropdown List */}
      <div className="dropdown-list">
        {educationProjects.map((project, index) => (
          <motion.div
            key={project.name}
            className="dropdown-project"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
          >
            <div 
              className="dropdown-header"
              onClick={() => toggleProject(project.name)}
              style={{ 
                backgroundColor: theme.cardBackground,
                color: theme.text,
                borderColor: theme.border
              }}
            >
              <h3>{project.name}</h3>
              <div 
                className="dropdown-arrow"
                style={{ transform: expandedProject === project.name ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ▼
              </div>
            </div>
            
            {expandedProject === project.name && (
              <motion.div 
                className="dropdown-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  backgroundColor: theme.cardBackground,
                  color: theme.text,
                  borderColor: theme.border
                }}
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
                        View Course
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
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

export default Education; 