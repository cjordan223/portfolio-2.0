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
            I'm Conner Jordan, a Security Engineer and Full-Stack Developer focused on building secure, practical applications while digging into the cybersecurity world. Most recently, I worked at Great Wolf Resorts as a Security Support Engineer, where I built scripts for hybrid Azure tenant management, automated security processes, and developed data visualization pipelines for executive dashboards.
          </p>
          <p>
            My career started in project management at Palomar Homes, leading teams and streamlining operations, before I shifted into tech as a Freelance Web Developer at Simple.biz, building performance-optimized, accessible websites. I earned my B.S. in Software Engineering from California State University - Monterey Bay (December 2024), wrapping it up with an award-winning capstone project, Phishfinder. It's a lightweight Chrome extension for real-time phishing detection in Gmail, driven by AI and algorithmic analysis—born out of cybersecurity gaps I spotted while working full-time as a security engineer during the last two years of my degree.
          </p>
        </div>
        
        <div className="skills-card" style={{ backgroundColor: theme.cardBackground }}>
          <h2 style={{ color: theme.secondary }}>My Approach</h2>
          <p>
            I'm all about blending cybersecurity with software development, keeping security at the core of what I build. Hands-on time with tools like CrowdStrike, Carbon Black, and Rapid7 has shaped how I create applications that work well, feel intuitive, and hold up against today's threats.
          </p>
          <p>
            I'm driven to cut out repetitive tasks and minimize mistakes. That focus has shaved hundreds of hours off workloads in my past roles. My tech stack spans JavaScript, Python, React, Node.js, and cloud tech, with an AWS CCP earned earlier this year.
          </p>
        </div>
        
        <div className="interests-card" style={{ backgroundColor: theme.cardBackground }}>
          <h2 style={{ color: theme.secondary }}>Beyond Code</h2>
          <p>
            Outside of tech, I'm usually camping or hiking with my wife and our dog, Bernal, somewhere along the San Luis Obispo coast. I love traveling when I can and tinkering in my home lab—lately, I've been working on a private LLM using a DeepSeek fork, squeezing performance out of less-than-ideal hardware. It's led me down a rabbit hole of LLMs and RAG applications, which keeps things interesting.
          </p>
          <p>
            I'm a big believer in tech that's useful, accessible and open source. If you're into tech or security and want to chat, feel free to reach out via the contact info in my terminal below (type "contact") or find me on LinkedIn.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 