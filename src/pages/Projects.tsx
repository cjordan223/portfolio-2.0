import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Projects.css';

interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  image?: string;
  path?: string;  // GitHub repository URL
  site?: string;  // Live site URL if available
  imageHeight?: string;
}

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('featured');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Memoize the projects array
  const projects = useMemo(() => [
    {
      name: "PhishFinder",
      category: "featured",
      tags: ["Vue.js", "OAuth 2.0", "API Integration", "Security"],
      description: "PhishFinder is a web extension designed to enhance email security by identifying and flagging phishing and spearphishing patterns. Built using Vue.js and integrating with Gmail's API through OAuth 2.0, it provides real-time security analysis of incoming emails.",
      image: "/img/phishfinderlogo.png",
      path: "https://github.com/cjordan223/PhishFinder",
      site: "/course/cst499",
      imageHeight: "140px"
    },
    {
      name: "Student Portal (Full Stack)",
      category: "featured",
      tags: ["React", "Spring", "Full Stack", "Database"],
      description: "3 person project. A comprehensive student registration system with secure authentication and role-based access control for students, instructors, and system admins. More info in archives > cst438.",
      image: "https://lh3.googleusercontent.com/proxy/eKBEK2wSlZC1szJe8i6_rkWS5UIH02dHDRJxWxhUmqirbm-G1CbiAYGZ6bf8NxV0FobQzfDBr5ERJfUuSFUf1gKy2M7K",
      path: "https://github.com/cjordan223/cst438_Assignment3/",
    },
    {
      name: "Weather Wise",
      category: "featured",
      tags: ["JavaScript", "API Integration", "UI/UX", "Weather Data"],
      description: "This is an application I built for a web programming class. It uses a free API to gather weather data and display it in a user-friendly interface. It can take Zip Code, City, County, Coordinates, and other data types as input. Enter 'admin' (case sensitive) and '1234' for username and password if visiting the live site.",
      image: "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg",
      path: "https://github.com/cjordan223/WeatherWise-Code",
      site: "https://cjordan223.github.io/WeatherWise/"
    },
    {
      name: "CompTIA+ Flashcards (iOS)",
      category: "webapps",
      tags: ["Swift", "iOS", "Educational", "Mobile Development"],
      description: "I'm working on my Capstone project and studying for CompTIA, but still want to make time for personal projects, so I created flashcards in Swift to test in the iOS/XCode environment. It was surprisingly easy, with Swift having a lot of similarites to the React component structure.",
      image: "https://developer.apple.com/swift/images/swift-og.png",
      path: "https://github.com/cjordan223/compTIA-flashcards.git",
    },
    {
      name: "Guessing Game",
      category: "webapps",
      tags: ["React", "JavaScript", "Game Development", "Frontend"],
      description: "Simple puzzle game with JS. It's Wordle, basically. UPDATE: Improved with React for better performance and responsiveness.",
      image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg",
      path: "https://github.com/cjordan223/guessr-2",
      site: "https://cjordan223.github.io/guessr-2/"
    },
    {
      name: "System Monitoring App",
      category: "webapps",
      tags: ["Python", "PostgreSQL", "System Monitoring", "Data Analysis"],
      description: "The program runs on a Postgres server, and collects system information from an agent installed on your device. Some of the data was manipulated with NumPy and Pandas and you can see it in my programming section.",
      image: "/img/postgres.png",
      path: "https://github.com/cjordan223/FanClub"
    },
    {
      name: "Markov Text Generator",
      category: "webapps",
      tags: ["Python", "NLP", "Algorithms", "Text Generation"],
      description: "Mainly just an exercise to train a simple program to emulate speech.",
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg",
      path: "https://github.com/cjordan223/Markov.git"
    },
    {
      name: "User Vault",
      category: "webapps",
      tags: ["Python", "Database", "Web Development", "Authentication"],
      description: "Simple user database web app I built very early on with Python.",
      image: "/img/vault.png",
      path: "https://github.com/cjordan223/UserVault.git"
    },
    {
      name: "Currents API",
      category: "webapps",
      tags: ["JavaScript", "API Integration", "News", "Frontend"],
      description: "Web interface for Currents API, offers the latest news headlines from a multitude of sources.",
      image: "/img/news.png",
      path: "https://github.com/cjordan223/gray",
      site: "https://cjordan223.github.io/gray/"
    },
    {
      name: "Pandas & Numpy Data Analysis",
      category: "programming",
      tags: ["Python", "Pandas", "NumPy", "Data Analysis"],
      description: "Data analysis toolkit using Python's Pandas and NumPy libraries for statistical operations."
    },
    {
      name: "Data Structures & Algorithms",
      category: "programming",
      tags: ["Java", "DSA", "Computer Science", "Algorithms"],
      description: "Implementation of classic data structures and algorithms in Java with performance analysis."
    },
    {
      name: "CST 300: Major ProSeminar",
      category: "education",
      tags: ["Professional Writing", "Research", "Ethics"],
      description: "Students learn professional writing, presentation, research, and critical-thinking skills.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8bcyP6fWEtvxSXHuxlTGImVBEPtEi7mVyQ&s",
      site: "/course/cst300"
    },
    {
      name: "CST 311: Introduction to Computer Networking",
      category: "education",
      tags: ["Networking", "TCP/IP", "Protocols"],
      description: "Survey of Telecomm and Data Comm Technology Fundamentals.",
      image: "https://www.lifewire.com/thmb/TXVRTtkHvRpTjnRObQ3xm2VlsD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/WirelessNetwork-5994852003f4020011db5333.jpg",
      site: "/course/cst311"
    },
    {
      name: "CST 334: Operating Systems",
      category: "education",
      tags: ["OS", "Process Management", "Memory Management"],
      description: "Learn about the use and design of modern operating systems, focusing on Linux.",
      image: "https://cloudpso.com/wp-content/uploads/2023/02/is-the-operating-system-dead.webp",
      site: "/course/cst334"
    },
    {
      name: "CST 338: Software Design",
      category: "education",
      tags: ["OOP", "SDLC", "GUI Development"],
      description: "Intermediate-level programming course covering techniques for developing large-scale software systems.",
      image: "https://www.wedigraf.com/wp-content/uploads/2023/11/software-development-training-uyo-wedigraf-technologies-ltd-akwa-ibom-state.jpg",
      site: "/course/cst338"
    },
    {
      name: "CST 363: Database Management",
      category: "education",
      tags: ["SQL", "Database Design", "Normalization"],
      description: "Provides balanced coverage of database use and design, focusing on relational databases.",
      image: "https://assets.datamation.com/uploads/2023/06/dm-top-database-challenges.png",
      site: "/course/cst363"
    },
    {
      name: "CST 336: Internet Programming",
      category: "education",
      tags: ["JavaScript", "PHP", "Web Development", "Frontend"],
      description: "Provides students with dynamic web application development skills.",
      image: "/img/webprogramming.jpeg",
      site: "/course/cst336"
    },
    {
      name: "CST 370: Algorithms",
      category: "education",
      tags: ["Data Structures", "Algorithms", "Complexity Analysis", "Problem Solving"],
      description: "Students learn important data structures in computer science.",
      image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230807133054/Data-structure-algorithm.png",
      site: "/course/cst370"
    },
    {
      name: "CST 462S: Race, Gender, Class in the Digital World",
      category: "education",
      tags: ["Social Impact", "Digital Ethics", "Inclusivity"],
      description: "Provides students with key knowledge of race, gender, class in the digital landscape.",
      image: "https://yt3.googleusercontent.com/4YAaX7CsQ-paadHsNvC6wdv2nE_7VTKpoNJOTwFhHL4rQqLC8WFe6mNxL-z-e6sfHZbHG-ucPA=s900-c-k-c0x00ffffff-no-rj",
      site: "/course/cst462s"
    },
    {
      name: "CST 328: Digital Art and Design",
      category: "education",
      tags: ["Design", "UI/UX", "Digital Media"],
      description: "Introduction to digital design principles and practices.",
      image: "https://yt3.googleusercontent.com/4YAaX7CsQ-paadHsNvC6wdv2nE_7VTKpoNJOTwFhHL4rQqLC8WFe6mNxL-z-e6sfHZbHG-ucPA=s900-c-k-c0x00ffffff-no-rj",
      site: "/course/cst328"
    },
    {
      name: "CST 383: Introduction to Data Science",
      category: "education",
      tags: ["Python", "Data Analysis", "Machine Learning", "Statistics"],
      description: "Overview of modern data science tools and best practices.",
      image: "/img/datascience.jpeg",
      site: "/course/cst383"
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
    },
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
      tags: ["Web Design", "CMS", "Construction"],
      description: "Framing Service website showcasing carpentry expertise, project galleries, and service offerings for residential and commercial clients.",
      image: "/img/carpentry.png",
      site: "https://www.carpentrysolutionsinfo.com/",
    },
  ], []);

  // Categories with friendly display names - now with "All Projects" option
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'featured', name: 'Featured' },
    { id: 'webapps', name: 'Web Applications' },
    { id: 'programming', name: 'Programming & Data' },
    { id: 'education', name: 'Academic' },
    { id: 'client', name: 'Client Work' },
  ];

  // Filter projects based on category only (no tag filtering)
  useEffect(() => {
    const filteredProjects = projects.filter(project => 
      activeCategory === 'all' || project.category === activeCategory
    );
    setFilteredProjects(filteredProjects);
  }, [activeCategory, projects]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="projects-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        My Projects
      </motion.h1>

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
              backgroundColor: activeCategory === category.id ? theme.primary : 'transparent',
              color: activeCategory === category.id ? theme.cardBackground : theme.text,
              borderColor: theme.border
            }}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card"
              style={{ backgroundColor: theme.cardBackground }}
              variants={itemVariants}
            >
              <div className="project-image-container" style={{ height: project.imageHeight || '180px' }}>
                <img 
                  src={project.image || '/img/placeholder-project.jpg'} 
                  alt={project.name} 
                  className="project-image"
                />
              </div>
              
              <div className="project-content">
                <h3 style={{ color: theme.primary }}>{project.name}</h3>
                
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="tag"
                      style={{ 
                        backgroundColor: theme.cardBackground,
                        color: theme.text
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p>{project.description}</p>
                
                {/* Educational course card - make course link prominent */}
                {project.category === 'education' && (
                  <div className="course-link-container" style={{ 
                    marginTop: '1.5rem', 
                    textAlign: 'center' 
                  }}>
                    <Link 
                      to={`/course/${project.name.split(':')[0].toLowerCase().replace(/\s/g, '')}`}
                      className="course-button"
                      style={{ 
                        backgroundColor: theme.primary,
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        display: 'inline-block',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      View Course Details
                    </Link>
                  </div>
                )}
                
                {/* Show GitHub and demo links only for non-educational projects */}
                {project.category !== 'education' && (
                  <div className="project-links" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem', 
                    marginTop: '1rem' 
                  }}>
                    {project.path && (
                      <a 
                        href={project.path} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link github-link"
                        style={{ 
                          backgroundColor: '#24292e',
                          color: 'white',
                          padding: '0.6rem 1rem',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontWeight: 500,
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        GitHub Code
                      </a>
                    )}
                    
                    {project.site && project.category !== 'education' && (
                      <a 
                        href={project.site.startsWith('/') ? project.site : project.site} 
                        target={project.site.startsWith('/') ? '_self' : '_blank'} 
                        rel="noopener noreferrer"
                        className="project-link demo-link"
                        style={{ 
                          backgroundColor: theme.accent || '#2196f3',
                          color: 'white',
                          padding: '0.6rem 1rem',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontWeight: 500,
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        {project.site.startsWith('/') ? 'View Details' : 'Live Demo'}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p 
            className="no-projects"
            variants={itemVariants}
          >
            No projects found matching the selected criteria.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Projects; 