import React, { useState, useMemo } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './DataScience.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  image?: string;
  path?: string;
  site?: string;
  notebook?: string;
}

const DataScience: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('featured');
  
  // Categories for the filter buttons - same as in Projects.tsx
  const categories = [
    { id: 'featured', name: 'Featured' },
    { id: 'webapps', name: 'Web Apps' },
    { id: 'datascience', name: 'Data Science' },
    { id: 'education', name: 'Education' },
    { id: 'client', name: 'Client Work' },
  ];

  // Memoize just the data science projects
  const dataProjects = useMemo(() => [
    {
      name: "Pandas & Numpy Data Analysis",
      category: "datascience",
      tags: ["Python", "Pandas", "NumPy", "Data Analysis"],
      description: "Data analysis toolkit using Python's Pandas and NumPy libraries for statistical operations and data transformation. This project demonstrates various techniques for data cleaning, manipulation, and visualization.",
      image: "/img/pandas.jpeg",
      path: "https://github.com/cjordan223/pandas-examples"
    },
    {
      name: "Data Structures & Algorithms",
      category: "datascience",
      tags: ["Java", "DSA", "Computer Science", "Algorithms"],
      description: "Implementation of classic data structures and algorithms in Java with performance analysis. Includes sorting algorithms, search techniques, and data structure implementations with time complexity analysis.",
      image: "/img/DP.png",
      path: "https://github.com/cjordan223/algorithm-examples"
    },
    {
      name: "Presidential Campaign Data Analysis",
      category: "datascience",
      tags: ["Python", "Pandas", "Data Visualization", "Political Analysis"],
      description: "An exploratory data analysis of presidential campaign contributions and voting patterns. This notebook examines correlations between donations, demographics, and election outcomes.",
      image: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
      notebook: "/html/campaign-exploration-1.html",
      path: "https://github.com/cjordan223/data-analysis"
    },
    {
      name: "Home Network Speed Analysis",
      category: "datascience",
      tags: ["Python", "Data Visualization", "Network Analysis", "Time Series"],
      description: "Analysis of home internet speed tests over time, comparing different service providers and identifying patterns in network performance during peak usage hours.",
      image: "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg",
      notebook: "/html/speedtest_compare.html",
      path: "https://github.com/cjordan223/network-analysis"
    },
    {
      name: "Student Housing Data (ML)",
      category: "datascience",
      tags: ["Python", "Machine Learning", "Regression", "Clustering"],
      description: "Machine learning approaches to predict housing prices near university campuses. Includes regression models and clustering analysis to identify factors that influence student housing costs.",
      image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg",
      notebook: "/html/studenthousing.html",
      path: "https://github.com/cjordan223/ml-housing"
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
    <div className="data-science-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        Data Analysis
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="page-description"
      >
        Collection of school work and some personal projects with DA
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
              backgroundColor: category.id === 'datascience' ? theme.primary : 'transparent',
              color: category.id === 'datascience' ? theme.cardBackground : theme.text,
              borderColor: theme.border
            }}
            onClick={() => {
              if (category.id === 'client') {
                navigate('/client-work');
              } else if (category.id === 'webapps' || category.id === 'education') {
                navigate('/projects', { state: { activeCategory: category.id } });
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      <div className="dropdown-list">
        {dataProjects.map((project, index) => (
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
                    
                    <div className="project-actions">
                      {project.notebook && (
                        <a 
                          href={project.notebook} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="view-notebook-btn"
                          style={{ 
                            backgroundColor: theme.accent,
                            color: 'white'
                          }}
                        >
                          View Jupyter Notebook
                        </a>
                      )}
                      
                      {project.path && (
                        <a 
                          href={project.path} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="github-btn"
                          style={{ 
                            borderColor: '#24292e',
                            color: '#24292e',
                          }}
                        >
                          GitHub Code
                        </a>
                      )}
                    </div>
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

export default DataScience; 