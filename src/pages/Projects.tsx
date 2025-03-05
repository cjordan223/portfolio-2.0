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
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: number]: boolean}>({});

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
      image: "https://www.higher-education-marketing.com/wp-content/uploads/2022/10/iStock-1177184973.jpg",
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
      category: "datascience",
      tags: ["Python", "Pandas", "NumPy", "Data Analysis"],
      description: "Data analysis toolkit using Python's Pandas and NumPy libraries for statistical operations.",
      image: "/img/pandas.jpeg",
      site: "https://github.com/cjordan223/voyager"
    },
    {
      name: "Data Structures & Algorithms",
      category: "datascience",
      tags: ["Java", "DSA", "Computer Science", "Algorithms"],
      description: "Implementation of classic data structures and algorithms in Java with performance analysis.",
      image: "/img/DP.png",
      site: "https://github.com/cjordan223/DSA-collection.git"
    },
    {
      name: "CST 300: Major ProSeminar",
      category: "education",
      tags: ["Professional Writing", "Research", "Ethics"],
      description: "Students learn professional writing, presentation, research, and critical-thinking skills.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8bcyP6fWEtvxSXHuxlTGImVBEPtEi7mVyQ&s",
      site: "/course/cst300",
      imageHeight: "100px"
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
      image: "data:image/jpeg;base64,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",
      site: "/course/cst370"
    },
    {
      name: "CST 462S: Race, Gender, Class in the Digital World",
      category: "education",
      tags: ["Social Impact", "Digital Ethics", "Inclusivity"],
      description: "Provides students with key knowledge of race, gender, class in the digital landscape.",
      image: "/img/RGI.jpeg",
      site: "/course/cst462s"
    },
    {
      name: "CST 328: Digital Art and Design",
      category: "education",
      tags: ["Design", "UI/UX", "Digital Media"],
      description: "Introduction to digital design principles and practices.",
      image: "/img/DAD.png",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYa6mbsQAdR3XVokNHVaDlVLNJbTj520QvTw&s",
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
      tags: ["Web Design", "CMS", "Small Business"],
      description: "Custom website development for a carpentry and woodworking business, featuring portfolio of completed projects and contact forms.",
      image: "/img/carpentry.png",
      site: "https://www.carpentrysolutionsinfo.com/",
    },
    {
      name: "Student Housing Data Analysis",
      category: "datascience",
      tags: ["Python", "Jupyter", "Data Analysis", "Pandas"],
      description: "Analysis of student housing data, exploring factors affecting housing choices and preferences among university students.",
      image: "/img/jupyter.png",
      site: "/html/studenthousing.html"
    },
    {
      name: "Internet Speed Test Comparison",
      category: "datascience",
      tags: ["Python", "Jupyter", "Data Visualization", "Analysis"],
      description: "Comparative analysis of internet service providers' performance based on speed test data across different regions.",
      image: "/img/jupyter.png",
      site: "/html/speedtest_compare.html"
    },
    {
      name: "Campaign Data Exploration",
      category: "datascience",
      tags: ["Python", "Jupyter", "Data Science", "Marketing"],
      description: "Exploratory analysis of marketing campaign data to identify patterns and success factors for different customer segments.",
      image: "/img/jupyter.png",
      site: "/html/campaign-exploration-1.html"
    },
  ], []);

  // Filter projects based on active category
  useEffect(() => {
    const filtered = projects.filter(project => project.category === activeCategory);
    setFilteredProjects(filtered);
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
      transition: { duration: 0.5 }
    }
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Categories for the filter buttons
  const categories = [
    { id: 'featured', name: 'Featured' },
    { id: 'webapps', name: 'Web Apps' },
    { id: 'datascience', name: 'Data science' },
    { id: 'education', name: 'Education' },
    { id: 'client', name: 'Client Work' },
  ];

  // Toggle description expansion
  const toggleDescription = (index: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="projects-container">
      <motion.h1
        style={{ 
          color: theme.text,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          zIndex: 5
        }}
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        Projects & Portfolio
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
              backgroundColor: activeCategory === category.id ? theme.primary : 'rgba(0, 0, 0, 0.2)',
              color: activeCategory === category.id ? '#ffffff' : theme.text,
              borderColor: activeCategory === category.id ? theme.primary : 'rgba(255, 255, 255, 0.3)'
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
              className="card bg-base-100 shadow-xl"
              style={{ 
                backgroundColor: theme.cardBackground,
                "--card-bg": theme.cardBackground // CSS variable for gradient
              } as React.CSSProperties}
              variants={itemVariants}
            >
              <figure className="project-image-wrapper">
                <img 
                  src={project.image || '/img/placeholder-project.jpg'} 
                  alt={project.name} 
                  className="project-image"
                />
              </figure>
              
              <div className="card-body">
                <h2 className="card-title" style={{ color: theme.primary }}>
                  {project.name}
                  {project.category === 'featured' && (
                    <div className="badge badge-secondary" style={{ 
                      backgroundColor: theme.accent,
                      color: 'white'
                    }}>
                      FEATURED
                    </div>
                  )}
                </h2>
                
                <p className={`project-description ${expandedDescriptions[index] ? 'expanded' : ''}`}>
                  {project.description}
                </p>
                
                {project.description.length > 150 && (
                  <button 
                    className="read-more-btn"
                    onClick={() => toggleDescription(index)}
                    style={{ color: theme.primary }}
                  >
                    {expandedDescriptions[index] ? 'Read Less' : 'Read More'}
                  </button>
                )}
                
                <div className="card-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <div 
                      key={tagIndex}
                      className="badge badge-outline"
                      style={{ 
                        borderColor: theme.border,
                        color: theme.text
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                
                <div className="card-actions mt-auto pt-4">
                  {/* Educational course card - make course link prominent */}
                  {project.category === 'education' && (
                    <Link 
                      to={project.site || `/course/${project.name.split(':')[0].toLowerCase().replace(/\s/g, '')}`}
                      className="btn btn-primary w-full"
                      style={{ 
                        backgroundColor: theme.primary,
                        color: 'white',
                      }}
                    >
                      View Course Details
                    </Link>
                  )}
                  
                  {/* Show GitHub and demo links only for non-educational projects */}
                  {project.category !== 'education' && (
                    <>
                      {project.path && (
                        <a 
                          href={project.path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline flex-1"
                          style={{ 
                            borderColor: '#24292e',
                            color: '#24292e',
                          }}
                        >
                          GitHub Code
                        </a>
                      )}
                      
                      {project.site && (
                        <a 
                          href={project.site.startsWith('/') ? project.site : project.site} 
                          target={project.site.startsWith('/') ? '_self' : '_blank'} 
                          rel="noopener noreferrer"
                          className="btn btn-primary flex-1"
                          style={{ 
                            backgroundColor: theme.accent || '#2196f3',
                            color: 'white',
                          }}
                        >
                          {project.site.startsWith('/') ? 'View Details' : 'Live Demo'}
                        </a>
                      )}
                    </>
                  )}
                </div>
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