import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import './Resume.css';

const Resume: React.FC = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  return (
    <div className="resume-container">
      <motion.div
        className="resume-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ color: theme.primary }}>My Resume</h1>
        <a 
          href="/Conner_Jordan_Resume.pdf" 
          className="download-button"
          style={{ 
            backgroundColor: theme.primary,
            color: theme.cardBackground 
          }}
          download
        >
          Download Resume
        </a>
      </motion.div>
      
      <motion.div 
        className="resume-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="resume-section" variants={itemVariants}>
          <h2 style={{ color: theme.secondary }}>Summary</h2>
          <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
            <p>
              Security Engineer and Full-Stack Developer with expertise in automating security workflows, 
              building secure applications, and implementing robust defensive measures. Proficient in 
              developing with React, TypeScript, and modern backend technologies.
            </p>
          </div>
        </motion.section>

        <motion.section className="resume-section" variants={itemVariants}>
          <h2 style={{ color: theme.secondary }}>Work Experience</h2>
          
          <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
            <h3>Security Support Engineer</h3>
            <div className="job-info">
              <span className="company">Great Wolf Resorts</span>
              <span className="date">May 2023 - Present</span>
            </div>
            <ul>
              <li>Develop and maintain scripts for hybrid Azure tenant management, leading deployments to automate cybersecurity protocols e.g. Carbon Black Agent updates, Citrix Patching, and Bitlocker device enforcement across the environment.</li>
              <li>Automated security certificate deployment via CrowdStrike RTR to prevent service disruptions for critical teams, achieving zero downtime during implementation.</li>
              <li>Tasked with improving support efficiency, engineered a PowerShell interface with MS Graph API for Distribution List management of 10,000+ users, eliminating human error and reducing manual workload by 500+ hours annually.</li>
              <li>Developed SQL log query frameworks in Rapid7, creating dynamic data visualization pipelines to highlight suspicious user behavior for executive dashboards.</li>
              <li>Orchestrated security awareness campaigns using KnowBe4, building custom Python analytics tools with Pandas/Numpy to transform phishing simulation data into actionable insights.</li>
            </ul>
            <div className="tech-used">
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>Azure</span>
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>PowerShell</span>
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>Python</span>
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>SQL</span>
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>MS Graph API</span>
            </div>
          </div>
          
          <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
            <h3>Freelance Web Developer</h3>
            <div className="job-info">
              <span className="company">Simple.biz</span>
              <span className="date">August 2022 - May 2023</span>
            </div>
            <ul>
              <li>Delivered production-ready websites under tight deadlines, optimized site performance and targeted SEO strategies, including alt tags and meta descriptions, resulting in improved search rankings and increased client visibility.</li>
              <li>Implemented WCAG and ADA guidelines to ensure compliance, creating inclusive web applications that served diverse user needs and improved usability scores.</li>
              <li>Conducted extensive cross-browser and device compatibility testing, resolving functional discrepancies and ensuring seamless operation across all platforms, leading to an overall decrease in reported user issues.</li>
            </ul>
            <div className="tech-used">
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>JavaScript</span>
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>React</span>
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>HTML/CSS</span>
              <span className="tech-tag" style={{ backgroundColor: theme.accent, color: theme.cardBackground }}>SEO</span>
            </div>
          </div>
          
          <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
            <h3>Senior Project Manager</h3>
            <div className="job-info">
              <span className="company">Palomar Homes</span>
              <span className="date">September 2017 - August 2022</span>
            </div>
            <ul>
              <li>Observed delays in project timelines due to unclear roadmaps, introduced detailed project plan templates with critical checkpoints, improving delivery timelines and ensuring stakeholder alignment.</li>
              <li>Worked with local authorities and engineers to resolve issues, achieving 100% regulatory approval for all projects.</li>
              <li>Led a team of field technicians and administrative staff, implementing weekly goal-setting sessions and task-tracking protocols, boosting project completion rates and reducing administrative errors.</li>
            </ul>
          </div>
        </motion.section>
        
        <motion.section className="resume-section" variants={itemVariants}>
          <h2 style={{ color: theme.secondary }}>Education</h2>
          <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
            <h3>California State University - Monterey Bay</h3>
            <div className="job-info">
              <span className="degree">B.S., Software Engineering</span>
              <span className="date">December 2024</span>
            </div>
            <p>Capstone Award for Innovation (2024)</p>
          </div>
        </motion.section>

        
        <motion.section className="resume-section" variants={itemVariants}>
          <h2 style={{ color: theme.secondary }}>Skills</h2>
          <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Programming Languages</h3>
                <div className="skills">
                  <span>JavaScript</span>
                  <span>Python</span>
                  <span>Java</span>
                  <span>C/C++</span>
                  <span>SQL</span>
                  <span>Swift</span>
                  <span>PowerShell</span>
                  <span>Bash</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Frontend</h3>
                <div className="skills">
                  <span>React.js</span>
                  <span>Vue.js</span>
                  <span>Bootstrap</span>
                  <span>Tailwind UI</span>
                  <span>MUI</span>
                  <span>Webpack</span>
                  <span>Vite</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Backend</h3>
                <div className="skills">
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>Django</span>
                  <span>Flask</span>
                  <span>Spring Boot</span>
                  <span>PHP</span>
                  <span>.NET</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Cloud Technologies</h3>
                <div className="skills">
                  <span>AWS</span>
                  <span>Google Cloud</span>
                  <span>Azure</span>
                  <span>Docker</span>
                  <span>DynamoDB</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Security & Systems</h3>
                <div className="skills">
                  <span>CrowdStrike</span>
                  <span>Carbon Black</span>
                  <span>Rapid7</span>
                  <span>Tenable</span>
                  <span>KnowBe4</span>
                  <span>Microsoft 365</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        <motion.section className="resume-section" variants={itemVariants}>
          <h2 style={{ color: theme.secondary }}>Certifications</h2>
          <div className="content-card" style={{ backgroundColor: theme.cardBackground }}>
            <ul className="certifications">
              <li>AWS Certified Cloud Practitioner</li>
            </ul>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Resume; 