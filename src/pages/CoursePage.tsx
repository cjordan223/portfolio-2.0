import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';

// Define types
interface CourseData {
  id: string;
  name: string;
  description: string;
  term: string;
  credits: number;
  personalNote: string;
  imageUrl?: string;
  grade?: string;
  extraLink?: {
    url: string;
    text: string;
    internal: boolean;
  };
}

// Complete course data with all fields
const courseData: CourseData[] = [
  {
    id: 'cst300',
    name: 'CST 300: Major ProSeminar',
    description: 'Students learn professional writing, presentation, research, and critical-thinking skills.',
    term: 'Spring 2023 - Term A',
    credits: 4,
    personalNote: 'This class served primarily as an introduction to the program, focusing on planning and preparedness for what would become a very fast-paced and comprehensive journey.',
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8bcyP6fWEtvxSXHuxlTGImVBEPtEi7mVyQ&s",
    grade: "A"
  },
  {
    id: 'cst338',
    name: 'CST 338: Software Design',
    description: 'Intermediate-level programming course covering techniques for developing large-scale software systems.',
    term: 'Spring 2023 - Term B',
    credits: 4,
    personalNote: 'This was the first technical course in the program and it largely served as an introduction to the software development lifecycle and programming best practices.',
    imageUrl: "https://www.wedigraf.com/wp-content/uploads/2023/11/software-development-training-uyo-wedigraf-technologies-ltd-akwa-ibom-state.jpg",
    grade: "A"
  },
  {
    id: 'cst363',
    name: 'CST 363: Database Management',
    description: 'Provides balanced coverage of database use and design, focusing on relational databases.',
    term: 'Summer 2023 - Term A',
    credits: 4,
    personalNote: 'This course gave me a strong foundation in database principles, from schema design to SQL queries and programmatic access.',
    imageUrl: "https://assets.datamation.com/uploads/2023/06/dm-top-database-challenges.png",
    grade: "A"
  },
  {
    id: 'cst334',
    name: 'CST 334: Operating Systems',
    description: 'Learn about the use and design of modern operating systems, focusing on Linux.',
    term: 'Summer 2023 - Term B',
    credits: 4,
    personalNote: 'Working with Linux and understanding the core principles of operating systems provided valuable insights into how software interacts with hardware.',
    imageUrl: "https://cloudpso.com/wp-content/uploads/2023/02/is-the-operating-system-dead.webp",
    grade: "A"
  },
  {
    id: 'cst311',
    name: 'CST 311: Introduction to Computer Networking',
    description: 'Survey of Telecomm and Data Comm Technology Fundamentals.',
    term: 'Fall 2023 - Term A',
    credits: 4,
    personalNote: 'Learning about networking protocols and architecture has been invaluable for understanding how modern applications communicate.',
    imageUrl: "https://www.lifewire.com/thmb/TXVRTtkHvRpTjnRObQ3xm2VlsD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/WirelessNetwork-5994852003f4020011db5333.jpg",
    grade: "A"
  },
  {
    id: 'cst336',
    name: 'CST 336: Internet Programming',
    description: 'Provides students with dynamic web application development skills.',
    term: 'Fall 2023 - Term B',
    credits: 4,
    personalNote: 'This course strengthened my web development skills, particularly in creating dynamic, database-driven web applications.',
    imageUrl: "/img/webprogramming.jpeg",
    grade: "A"
  },
  {
    id: 'cst370',
    name: 'CST 370: Algorithms',
    description: 'Students learn important data structures in computer science.',
    term: 'Fall 2023 - Term B',
    credits: 4,
    personalNote: 'Diving deep into algorithms and data structures improved my problem-solving skills and code efficiency.',
    grade: "A"
  },
  {
    id: 'cst462s',
    name: 'CST 462S: Race, Gender, Class in the Digital World',
    description: 'Provides students with key knowledge of race, gender, class in the digital landscape.',
    term: 'Spring 2024 - Term A',
    credits: 3,
    personalNote: 'This course offered valuable perspectives on how technology intersects with social issues.',
    imageUrl: "https://yt3.googleusercontent.com/4YAaX7CsQ-paadHsNvC6wdv2nE_7VTKpoNJOTwFhHL4rQqLC8WFe6mNxL-z-e6sfHZbHG-ucPA=s900-c-k-c0x00ffffff-no-rj",
    grade: "A"
  },
  {
    id: 'cst328',
    name: 'CST 328: Digital Art and Design',
    description: 'Introduction to digital design principles and practices.',
    term: 'Spring 2024 - Term A',
    credits: 3,
    personalNote: 'This course complemented my technical skills with design thinking.',
    imageUrl: "https://yt3.googleusercontent.com/4YAaX7CsQ-paadHsNvC6wdv2nE_7VTKpoNJOTwFhHL4rQqLC8WFe6mNxL-z-e6sfHZbHG-ucPA=s900-c-k-c0x00ffffff-no-rj",
    grade: "A"
  },
  {
    id: 'cst383',
    name: 'CST 383: Introduction to Data Science',
    description: 'Overview of modern data science tools and best practices.',
    term: 'Spring 2024 - Term B',
    credits: 4,
    personalNote: 'Working with real datasets and learning to extract meaningful insights was both challenging and rewarding.',
    imageUrl: "/img/datascience.jpeg",
    grade: "A"
  },
  {
    id: 'cst438',
    name: 'CST 438: Software Engineering',
    description: 'Covers key knowledge of software engineering practices.',
    term: 'Spring 2024 - Term B',
    credits: 4,
    personalNote: 'Building on the foundation from CST 338, this course deepened my understanding of professional software development practices.',
    imageUrl: "https://cdn.sanity.io/images/tlr8oxjg/production/8065e9b35afcf58ba7b1b96e1d5be14420d47dec-1456x816.png?w=3840&q=100&fit=clip&auto=format",
    grade: "A"
  },
  {
    id: 'cst329',
    name: 'CST 329: Reasoning with Logic',
    description: 'In this course, students learn to develop skill in using logic to describe and assess arguments.',
    term: 'Summer 2024 - Term A',
    credits: 3,
    personalNote: 'This course strengthened my analytical thinking and problem-solving abilities.',
    imageUrl: "https://media.geeksforgeeks.org/wp-content/uploads/20240624022022/Propositional-Logic.webp",
    grade: "A"
  },
  {
    id: 'cst499',
    name: 'CST 499: Directed Capstone',
    description: 'The culmination of CST 489 planning and development into a significant software project.',
    term: 'Summer 2024 - Term B',
    credits: 4,
    personalNote: 'Developing PhishFinder as my capstone project was the perfect culmination of my degree program.',
    imageUrl: "/img/phishfinderlogo.png",
    grade: "A",
    extraLink: {
      url: "https://github.com/cjordan223/PhishFinder",
      text: "View PhishFinder Repository",
      internal: false
    }
  }
];

const CoursePage: React.FC = () => {
  const { theme } = useTheme();
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseData.find(c => c.id === courseId);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist or may have been moved.</p>
        <Link to="/projects" className="back-link">
          Back to Projects
        </Link>
      </div>
    );
  }

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="course-page">
        <motion.div 
          className="breadcrumbs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="crumb-link" style={{ color: theme.text }}>
            Home
          </Link>
          <span className="separator" style={{ color: theme.text }}>/</span>
          <Link to="/projects" className="crumb-link" style={{ color: theme.text }}>
            Projects
          </Link>
          <span className="separator" style={{ color: theme.text }}>/</span>
          <span className="current-crumb" style={{ color: theme.primary }}>
            {course.name.split(':')[0]}
          </span>
        </motion.div>

        <motion.h1 
          className="course-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: theme.primary }}
        >
          {course.name}
        </motion.h1>

        <div className="course-meta" style={{ color: theme.secondary }}>
          <span className="term">{course.term}</span>
          <span className="separator">•</span>
          <span className="credits">{course.credits} Credits</span>
        </div>

        <motion.div 
          className="course-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="content-card">
            <h2 style={{ color: theme.primary }}>Overview</h2>
            
            {course.imageUrl && (
              <div className="course-image-container">
                <img 
                  src={course.imageUrl} 
                  alt={`${course.name} illustration`} 
                  className="course-image"
                  onClick={() => handleOpenModal(course.imageUrl || '')}
                />
              </div>
            )}
            
            <p>{course.description}</p>
            <div className="course-details">
              <div className="detail-item">
                <strong>Term:</strong> {course.term}
              </div>
              <div className="detail-item">
                <strong>Credits:</strong> {course.credits}
              </div>
              {course.grade && (
                <div className="detail-item">
                  <strong>Grade:</strong> <span style={{ color: course.grade === 'A' ? '#4CAF50' : theme.text }}>{course.grade}</span>
                </div>
              )}
            </div>
          </div>

          {course.personalNote && (
            <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
              <h2 style={{ color: theme.secondary }}>Personal Reflection</h2>
              <p>{course.personalNote}</p>
            </div>
          )}

          {/* This is where we would display project details, screenshots, etc. */}
          {courseId === 'cst499' && (
            <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
              <h2 style={{ color: theme.secondary }}>Capstone Project: PhishFinder</h2>
              <div className="award-banner" style={{ backgroundColor: theme.accent }}>
                <span className="award-icon">🏆</span>
                <span className="award-text">Capstone Award for Innovation (2024)</span>
              </div>
              
              <p>
                PhishFinder is a lightweight Chrome extension that uses AI and algorithmic analysis 
                to provide real-time phishing detection for Gmail users. The project integrates 
                with Gmail's interface through OAuth 2.0 to analyze incoming emails for potential 
                security threats.
              </p>
              
              <h3>Key Features:</h3>
              <ul>
                <li>Real-time email security analysis</li>
                <li>OAuth 2.0 secure Gmail integration</li>
                <li>Dynamic sender profiling using MongoDB</li>
                <li>AI-powered content analysis</li>
                <li>URL and domain verification</li>
                <li>Custom security metrics dashboard</li>
              </ul>
              
              <h3>Application Screenshots:</h3>
              <div className="screenshots-grid">
                {[
                  { id: 1, image: "/img/oauth.png", caption: "OAuth 2.0 Secure Authentication Flow" },
                  { id: 2, image: "/img/Metrics.png", caption: "Security Metrics Dashboard" },
                  { id: 3, image: "/img/Analysis2.png", caption: "Advanced Email Analysis" },
                  { id: 4, image: "/img/Analysis.png", caption: "Threat Detection Interface" },
                  { id: 5, image: "/img/mirror.png", caption: "Gmail Mirror Integration" },
                  { id: 6, image: "/img/DB.png", caption: "MongoDB Profile Storage" }
                ].map(item => (
                  <div key={item.id} className="screenshot-card" onClick={() => handleOpenModal(item.image)}>
                    <div className="image-container">
                      <img 
                        src={item.image} 
                        alt={item.caption} 
                        className="screenshot"
                      />
                    </div>
                    <div className="caption">{item.caption}</div>
                  </div>
                ))}
              </div>
              
              <h3>Project Repositories:</h3>
              <div className="repo-links">
                <a 
                  href="https://github.com/cjordan223/PhishFinder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-button"
                  style={{ backgroundColor: theme.primary }}
                >
                  Frontend Repository
                </a>
                <a 
                  href="https://github.com/cjordan223/PhishFinder-Backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-button"
                  style={{ backgroundColor: theme.primary }}
                >
                  Backend Repository
                </a>
              </div>
              
              <h3>Project Demo:</h3>
              <div className="video-container">
                <iframe 
                  width="100%" 
                  height="500" 
                  src="https://www.youtube.com/embed/bYpPd5KmwMw?si=KhpazgPYXzEXyt3z" 
                  title="PhishFinder Demo"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          
          {course.extraLink && (
            <div className="extra-link">
              {course.extraLink.internal ? (
                <Link 
                  to={course.extraLink.url} 
                  className="link-button"
                  style={{ backgroundColor: theme.primary }}
                >
                  {course.extraLink.text}
                </Link>
              ) : (
                <a 
                  href={course.extraLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  style={{ backgroundColor: theme.primary }}
                >
                  {course.extraLink.text}
                </a>
              )}
            </div>
          )}
          
          <div className="navigation-buttons">
            <Link 
              to="/projects" 
              className="nav-button"
              style={{ 
                color: theme.text,
                borderColor: theme.border
              }}
            >
              <span className="nav-icon">←</span>
              <span>Back to Projects</span>
            </Link>
            
            <Link 
              to="/" 
              className="nav-button"
              style={{ 
                color: theme.text,
                borderColor: theme.border
              }}
            >
              <span>Home</span>
              <span className="nav-icon">→</span>
            </Link>
          </div>
        </motion.div>
        
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button 
                className="close-button"
                onClick={handleCloseModal}
                style={{ backgroundColor: theme.primary }}
              >
                ×
              </button>
              <img 
                src={`/img/${selectedImage}`} 
                alt="Enlarged view" 
                className="modal-image"
              />
            </div>
          </div>
        )}
      </div>
      
      <style>
        {`
        .course-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .course-not-found {
          text-align: center;
          padding: 3rem;
        }
        
        .breadcrumbs {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        
        .crumb-link {
          text-decoration: none;
        }
        
        .crumb-link:hover {
          text-decoration: underline;
        }
        
        .separator {
          margin: 0 0.5rem;
        }
        
        .course-title {
          margin-bottom: 0.5rem;
          font-size: 2.2rem;
        }
        
        .course-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .content-card {
          background-color: ${theme.cardBackground};
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        .content-card h2 {
          margin-top: 0;
          margin-bottom: 1.2rem;
          font-size: 1.6rem;
        }
        
        .content-card h3 {
          margin-top: 1.8rem;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          color: ${theme.secondary};
        }
        
        .content-card p {
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        
        .content-card ul {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .content-card li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        
        .award-banner {
          display: flex;
          align-items: center;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          color: white;
          font-weight: 500;
        }
        
        .award-icon {
          font-size: 1.5rem;
          margin-right: 0.8rem;
        }
        
        .screenshots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .screenshot-card {
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          background-color: ${theme.background};
        }
        
        .screenshot-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }
        
        .image-container {
          height: 180px;
          overflow: hidden;
        }
        
        .screenshot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .screenshot-card:hover .screenshot {
          transform: scale(1.05);
        }
        
        .caption {
          padding: 0.8rem;
          text-align: center;
          font-size: 0.9rem;
          color: ${theme.text};
        }
        
        .repo-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .repo-button {
          padding: 0.8rem 1.2rem;
          border-radius: 6px;
          color: white;
          text-decoration: none;
          font-weight: 500;
          flex: 1;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .repo-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .video-container {
          border-radius: 8px;
          overflow: hidden;
          margin-top: 1rem;
        }
        
        .extra-link {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .link-button {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .link-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 2.5rem;
        }
        
        .nav-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.2rem;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .nav-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .nav-icon {
          font-size: 1.2rem;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal-content {
          position: relative;
          width: 90%;
          max-width: 1000px;
          max-height: 90vh;
        }
        
        .modal-image {
          width: 100%;
          height: auto;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 4px;
        }
        
        .close-button {
          position: absolute;
          top: -40px;
          right: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          color: white;
          font-size: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 1001;
        }
        
        @media (max-width: 768px) {
          .repo-links {
            flex-direction: column;
          }
          
          .screenshots-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (max-width: 600px) {
          .course-page {
            padding: 1.5rem;
          }
          
          .content-card {
            padding: 1.5rem;
          }
          
          .screenshots-grid {
            grid-template-columns: 1fr;
          }
          
          .navigation-buttons {
            flex-direction: column;
            gap: 1rem;
          }
          
          .nav-button {
            justify-content: center;
          }
        }

        .course-image-container {
          width: 100%;
          height: 250px;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .course-image-container:hover {
          transform: scale(1.02);
        }
        
        .course-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .course-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1.5rem;
          font-size: 1.1rem;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        `}
      </style>
    </>
  );
};

export default CoursePage; 