import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const { theme } = useTheme();

  return (
    <div className="about-container">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        About Me
      </motion.h1>
      
      <motion.div 
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="bio-card" style={{ backgroundColor: theme.cardBackground }}>
          <h2 style={{ color: theme.secondary }}>Professional Journey</h2>
          <p>
            I'm Conner Jordan, a Security Engineer and Full-Stack Developer with a passion for building secure, efficient applications and automating cybersecurity protocols. Currently, I'm working at Great Wolf Resorts as a Security Support Engineer, where I develop and maintain scripts for hybrid Azure tenant management, automate security implementations, and create data visualization pipelines for executive dashboards.
          </p>
          <p>
            My journey began with project management at Palomar Homes, where I led teams and implemented efficiency protocols. I then transitioned to tech as a Freelance Web Developer at Simple.biz, delivering production-ready websites with optimized performance and accessibility features. Now, I combine my project management background with my technical skills to create robust security solutions.
          </p>
          <p>
            I'm completing my B.S. in Software Engineering at California State University - Monterey Bay (graduating December 2024), where my capstone project earned the Award for Innovation. This project, Phishfinder, is a lightweight Chrome extension that uses AI and algorithmic analysis for real-time phishing detection in Gmail.
          </p>
        </div>
        
        <div className="skills-card" style={{ backgroundColor: theme.cardBackground }}>
          <h2 style={{ color: theme.secondary }}>My Approach</h2>
          <p>
            I thrive at the intersection of cybersecurity and software development, bringing a security-first mindset to every project. My experience with enterprise systems like CrowdStrike, Carbon Black, and Rapid7 has taught me how to build applications that are not only functional and user-friendly but also secure against modern threats.
          </p>
          <p>
            I'm particularly passionate about automation and efficiency. Whether I'm creating PowerShell scripts to manage distribution lists for 10,000+ users or developing custom Python analytics tools, I focus on eliminating manual workload and reducing human error. This approach has saved hundreds of hours of work annually in my current role.
          </p>
          <p>
            As an AWS Certified Cloud Practitioner, I understand cloud infrastructure and how to leverage it for scalable, secure applications. My diverse technical stack includes JavaScript, Python, React, Node.js, and various cloud technologies, allowing me to tackle problems from multiple angles.
          </p>
        </div>
        
        <div className="interests-card" style={{ backgroundColor: theme.cardBackground }}>
          <h2 style={{ color: theme.secondary }}>Beyond Code</h2>
          <p>
            When I'm not writing code or enhancing security protocols, I enjoy exploring the beautiful coastal areas of San Luis Obispo. I'm an advocate for continuous learning and regularly explore new technologies and security methodologies to stay ahead of emerging threats.
          </p>
          <p>
            I believe in creating technology that serves people, which is why accessibility and user experience are always priorities in my work. My experience implementing WCAG and ADA guidelines has shown me the importance of building inclusive digital experiences.
          </p>
          <p>
            I'm always open to connecting with fellow tech enthusiasts and potential collaborators. Feel free to reach out through the contact information in my terminal (try typing "contact" in the CLI below) or connect with me on LinkedIn.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 