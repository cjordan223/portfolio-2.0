import React, { useState, useMemo, useRef } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls, Html } from '@react-three/drei';
import './WebApps.css';

interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  image?: string;
  path?: string;
  site?: string;
}

// 3D Cube Face component
const CubeFace: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  project: Project;
  isActive: boolean;
  onClick: () => void;
}> = ({ position, rotation, project, isActive, onClick }) => {
  const { theme } = useTheme();
  
  // Animation spring for hover effect
  const [hovered, setHovered] = useState(false);
  const { scale, color } = useSpring({
    scale: hovered ? 1.1 : 1,
    color: hovered ? theme.accent : theme.primary,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <animated.mesh
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.8, 1.8, 0.1]} />
      <animated.meshStandardMaterial color={color} />
      
      <Html position={[0, 0, 0.06]} transform style={{ width: '150px', pointerEvents: 'none' }}>
        <div 
          className="cube-face-content"
          style={{ 
            backgroundColor: isActive ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)',
            padding: isActive ? '15px' : '10px',
            borderRadius: '8px',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}
        >
          <h3 style={{ color: 'white', margin: '0 0 8px 0', fontSize: isActive ? '1rem' : '0.9rem' }}>
            {project.name}
          </h3>
          {isActive && (
            <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {project.tags.slice(0, 2).map((tag, i) => (
                <span key={i} style={{ 
                  background: theme.accent, 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontSize: '0.7rem'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Html>
    </animated.mesh>
  );
};

// 3D Cube component
const ProjectCube: React.FC<{
  projects: Project[];
  activeProject: string | null;
  setActiveProject: (name: string) => void;
}> = ({ projects, activeProject, setActiveProject }) => {
  const cubeRef = useRef<THREE.Group>(null);
  
  // Rotation animation
  useFrame(() => {
    if (cubeRef.current && !activeProject) {
      cubeRef.current.rotation.y += 0.005;
    }
  });

  // Position the cube faces
  const faces = [
    // Front
    { position: [0, 0, 1.5], rotation: [0, 0, 0] },
    // Right
    { position: [1.5, 0, 0], rotation: [0, Math.PI / 2, 0] },
    // Back
    { position: [0, 0, -1.5], rotation: [0, Math.PI, 0] },
    // Left
    { position: [-1.5, 0, 0], rotation: [0, -Math.PI / 2, 0] },
    // Top
    { position: [0, 1.5, 0], rotation: [Math.PI / 2, 0, 0] },
    // Bottom
    { position: [0, -1.5, 0], rotation: [-Math.PI / 2, 0, 0] }
  ];

  return (
    <group ref={cubeRef}>
      {projects.slice(0, 6).map((project, index) => (
        <CubeFace
          key={project.name}
          position={faces[index].position as [number, number, number]}
          rotation={faces[index].rotation as [number, number, number]}
          project={project}
          isActive={activeProject === project.name}
          onClick={() => setActiveProject(project.name)}
        />
      ))}
    </group>
  );
};

const WebApps: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  
  // Categories for the filter buttons - same as in Projects.tsx
  const categories = [
    { id: 'featured', name: 'Featured' },
    { id: 'webapps', name: 'Web Apps' },
    { id: 'datascience', name: 'Data Science' },
    { id: 'education', name: 'Education' },
    { id: 'client', name: 'Client Work' },
  ];

  // Memoize just the web app projects
  const webProjects = useMemo(() => [
    {
      name: "Portfolio Website",
      category: "webapps",
      tags: ["React", "TypeScript", "Framer Motion", "CSS"],
      description: "A complete redesign of my personal portfolio using React, TypeScript, and Framer Motion. Features a custom terminal interface, animated transitions, and responsive design principles.",
      image: "/img/portfolio.png",
      path: "https://github.com/connerjordan/portfolio-2.0",
    },
    {
      name: "PhishFinder",
      category: "webapps",
      tags: ["Vue.js", "OAuth 2.0", "API Integration", "Security"],
      description: "PhishFinder is a web extension designed to enhance email security by identifying and flagging phishing and spearphishing patterns. Built using Vue.js and integrating with Gmail's API through OAuth 2.0, it provides real-time security analysis of incoming emails.",
      image: "/img/phishfinderlogo.png",
      path: "https://github.com/connerjordan/phishfinder",
    },
    {
      name: "Weather Dashboard",
      category: "webapps",
      tags: ["JavaScript", "APIs", "Chart.js", "Bootstrap"],
      description: "Interactive weather dashboard that fetches and visualizes weather data from multiple APIs. Allows users to search locations and view detailed forecast information with interactive charts.",
      image: "/img/weather.jpg",
      path: "https://github.com/connerjordan/weather-dashboard",
    },
    {
      name: "E-Commerce Platform",
      category: "webapps",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      description: "Full-stack e-commerce application with product catalog, shopping cart, user authentication, and order processing. Includes admin dashboard for inventory management.",
      image: "/img/ecommerce.jpg",
      path: "https://github.com/connerjordan/ecommerce-platform",
    },
    {
      name: "Task Manager",
      category: "webapps",
      tags: ["React", "Redux", "Firebase", "Material UI"],
      description: "Collaborative task management application with real-time updates using Firebase. Features task categorization, priority levels, and team assignment capabilities.",
      image: "/img/taskmanager.jpg",
      path: "https://github.com/connerjordan/task-manager",
    },
    {
      name: "Recipe Finder",
      category: "webapps",
      tags: ["JavaScript", "API Integration", "CSS Grid", "Responsive"],
      description: "Web application that helps users find recipes based on available ingredients. Integrates with recipe APIs and provides filtering options for dietary preferences.",
      image: "/img/recipe.jpg",
      path: "https://github.com/connerjordan/recipe-finder",
    }
  ], []);

  // Get the active project details if one is selected
  const activeProjectDetails = useMemo(() => {
    return webProjects.find(project => project.name === activeProject);
  }, [activeProject, webProjects]);

  return (
    <div className="webapps-page" style={{ backgroundColor: theme.background }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        Web Applications
      </motion.h1>

      <motion.p 
        className="page-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: theme.text }}
      >
        Interactive web applications showcasing frontend and full-stack development
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
              backgroundColor: category.id === 'webapps' ? theme.primary : 'transparent',
              color: category.id === 'webapps' ? theme.cardBackground : theme.text,
              borderColor: theme.border
            }}
            onClick={() => {
              if (category.id === 'client') {
                navigate('/client-work');
              } else if (category.id === 'datascience') {
                navigate('/data-science');
              } else if (category.id === 'education') {
                navigate('/education');
              } else if (category.id === 'featured') {
                navigate('/featured');
              } else {
                navigate('/web-apps');
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* 3D Cube Visualization */}
      <div className="cube-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <ProjectCube 
            projects={webProjects} 
            activeProject={activeProject} 
            setActiveProject={setActiveProject} 
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={!activeProject}
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        {/* Instructions */}
        <div className="cube-instructions" style={{ color: theme.text }}>
          <p>Click on a project to view details, or drag to rotate the cube</p>
        </div>
      </div>

      {/* Project Details Panel */}
      {activeProjectDetails && (
        <motion.div 
          className="project-details-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            backgroundColor: theme.cardBackground,
            color: theme.text,
            borderColor: theme.border
          }}
        >
          <div className="panel-header">
            <h2 style={{ color: theme.primary }}>{activeProjectDetails.name}</h2>
            <button 
              onClick={() => setActiveProject(null)}
              style={{ 
                backgroundColor: 'transparent',
                color: theme.text,
                borderColor: theme.border
              }}
            >
              Close
            </button>
          </div>
          
          <div className="panel-content">
            {activeProjectDetails.image && (
              <div className="panel-image-container">
                <img 
                  src={activeProjectDetails.image} 
                  alt={activeProjectDetails.name} 
                  className="panel-image"
                />
              </div>
            )}
            
            <div className="panel-info">
              <p className="panel-description">{activeProjectDetails.description}</p>
              
              <div className="tags-container">
                {activeProjectDetails.tags.map((tag, tagIndex) => (
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
              
              <div className="panel-actions">
                {activeProjectDetails.path && (
                  <a 
                    href={activeProjectDetails.path} 
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
                
                {activeProjectDetails.site && (
                  <a 
                    href={activeProjectDetails.site} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="visit-site-btn"
                    style={{ 
                      backgroundColor: theme.accent,
                      color: 'white'
                    }}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

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

export default WebApps; 