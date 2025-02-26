import React from 'react';
import './Resume.css';

const Resume: React.FC = () => {
  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1>My Resume</h1>
        <a href="/resume.pdf" download className="download-button">
          Download Resume
        </a>
      </div>

      <div className="resume-content">
        <section className="resume-section">
          <h2>Summary</h2>
          <p>Security Engineer and Full-Stack Developer with expertise in automating security workflows, building secure applications, and implementing robust defensive measures. Proficient in developing with React, TypeScript, and modern backend technologies.</p>
        </section>

        <section className="resume-section">
          <h2>Work Experience</h2>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">Security Support Engineer</h3>
              <span className="resume-item-date">May 2023 - Present</span>
            </div>
            <div className="resume-item-subtitle">Great Wolf Resorts - Chicago Corporate Office (Remote)</div>
            <div className="resume-item-content">
              <ul>
                <li>Develop and maintain scripts for hybrid Azure tenant management, leading deployments to automate cybersecurity protocols e.g. Carbon Black Agent updates, Citrix Patching, and BitLocker device enforcement across the environment.</li>
                <li>Automated security certificate deployment via CrowdStrike RTR to prevent service disruptions for critical teams, achieving zero downtime during implementation.</li>
                <li>Tasked with improving support efficiency, engineered a PowerShell interface with MS Graph API for Distribution List management of 10,000+ users, eliminating human error and reducing manual workload by 500+ hours annually.</li>
                <li>Developed SQL log query frameworks in Rapid7, creating dynamic data visualization pipelines to highlight suspicious user behavior for executive dashboards.</li>
                <li>Orchestrated security awareness campaigns using KnowBe4, building custom Python analytics tools with Pandas/Numpy to transform phishing simulation data into actionable insights.</li>
                <li>Configured and maintained virtual machines with RestAPI integrations, implementing automated SIEM workflows.</li>
              </ul>
            </div>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">Freelance Web Developer</h3>
              <span className="resume-item-date">August 2022 - May 2023</span>
            </div>
            <div className="resume-item-subtitle">Simple.biz - Durham, NC (Remote)</div>
            <div className="resume-item-content">
              <ul>
                <li>Delivered production-ready websites under tight deadlines, optimized site performance and targeted SEO strategies, including alt tags and meta descriptions, resulting in improved search rankings and increased client visibility.</li>
                <li>Implemented WCAG and ADA guidelines to ensure compliance, creating inclusive web applications that served diverse user needs and improved usability scores.</li>
                <li>Conducted extensive cross-browser and device compatibility testing, resolving functional discrepancies and ensuring seamless operation across all platforms, leading to an overall decrease in reported user issues.</li>
              </ul>
            </div>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">Senior Project Manager</h3>
              <span className="resume-item-date">September 2017 - August 2022</span>
            </div>
            <div className="resume-item-subtitle">Palomar Homes - San Luis Obispo, CA</div>
            <div className="resume-item-content">
              <ul>
                <li>Observed delays in project timelines due to unclear roadmaps, introduced detailed project plan templates with critical checkpoints, improving delivery timelines and ensuring stakeholder alignment.</li>
                <li>Worked with local authorities and engineers to resolve issues, achieving 100% regulatory approval for all projects.</li>
                <li>Led a team of field technicians and administrative staff, implementing weekly goal-setting sessions and task-tracking protocols, boosting project completion rates and reducing administrative errors.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">California State University - Monterey Bay</h3>
              <span className="resume-item-date">December 2024</span>
            </div>
            <div className="resume-item-subtitle">B.S., Software Engineering</div>
            <div className="resume-item-content">
              <p>Capstone Award for Innovation (2024)</p>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          
          <div className="resume-item">
            <h3 className="resume-item-title">Programming Languages</h3>
            <div className="skills-list">
              <span className="skill-item">JavaScript</span>
              <span className="skill-item">Python</span>
              <span className="skill-item">Java</span>
              <span className="skill-item">C/C++</span>
              <span className="skill-item">SQL</span>
              <span className="skill-item">Swift</span>
              <span className="skill-item">PowerShell</span>
              <span className="skill-item">Bash</span>
            </div>
          </div>
          
          <div className="resume-item">
            <h3 className="resume-item-title">Frontend</h3>
            <div className="skills-list">
              <span className="skill-item">React.js</span>
              <span className="skill-item">Vue.js</span>
              <span className="skill-item">Bootstrap</span>
              <span className="skill-item">Tailwind UI</span>
              <span className="skill-item">MUI</span>
              <span className="skill-item">Webpack</span>
              <span className="skill-item">Vite</span>
            </div>
          </div>
          
          <div className="resume-item">
            <h3 className="resume-item-title">Backend</h3>
            <div className="skills-list">
              <span className="skill-item">Node.js</span>
              <span className="skill-item">Express.js</span>
              <span className="skill-item">Django</span>
              <span className="skill-item">Flask</span>
              <span className="skill-item">Spring Boot</span>
              <span className="skill-item">PHP</span>
              <span className="skill-item">.NET</span>
            </div>
          </div>
          
          <div className="resume-item">
            <h3 className="resume-item-title">Cloud Technologies</h3>
            <div className="skills-list">
              <span className="skill-item">AWS</span>
              <span className="skill-item">Google Cloud</span>
              <span className="skill-item">Azure</span>
              <span className="skill-item">Docker</span>
              <span className="skill-item">DynamoDB</span>
            </div>
          </div>
          
          <div className="resume-item">
            <h3 className="resume-item-title">Security & Systems</h3>
            <div className="skills-list">
              <span className="skill-item">CrowdStrike</span>
              <span className="skill-item">Carbon Black</span>
              <span className="skill-item">Rapid7</span>
              <span className="skill-item">Tenable</span>
              <span className="skill-item">KnowBe4</span>
              <span className="skill-item">Microsoft 365</span>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">Phishfinder - Capstone Project</h3>
            </div>
            <div className="resume-item-content">
              <p>Lightweight Chrome extension using AI and algorithmic analysis that achieves real-time phishing detection for Gmail users.</p>
              <p><strong>Tech Stack:</strong> MongoDB, Express, Vue.js, Node.js</p>
            </div>
          </div>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">Guessr - Word Game</h3>
            </div>
            <div className="resume-item-content">
              <p>React word game with random word generation and state management.</p>
              <p><strong>Tech Stack:</strong> React, MUI, Node.js, RestAPIs</p>
            </div>
          </div>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h3 className="resume-item-title">Registrar Portal</h3>
            </div>
            <div className="resume-item-content">
              <p>Led a team of 3 at CSUMB to develop a full-stack registrar service with secure authentication, role-based access control, and responsive UI.</p>
              <p><strong>Tech Stack:</strong> SQL, Express.js, React.js, Node.js</p>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Certifications</h2>
          <div className="resume-item">
            <h3 className="resume-item-title">AWS Certified Cloud Practitioner</h3>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume; 