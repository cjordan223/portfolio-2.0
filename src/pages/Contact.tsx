import React, { useState } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.primary }}
      >
        Get In Touch
      </motion.h1>
      
      <div className="contact-content">
        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-card" style={{ backgroundColor: theme.cardBackground }}>
            <h2 style={{ color: theme.secondary }}>Send Me a Message</h2>
            
            {submitSuccess && (
              <div className="success-message" style={{ backgroundColor: theme.success }}>
                Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitError && (
              <div className="error-message" style={{ backgroundColor: theme.error }}>
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: theme.border
                  }}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: theme.border
                  }}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: theme.border
                  }}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: theme.border
                  }}
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
                style={{ 
                  backgroundColor: theme.primary,
                  color: '#fff',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
        
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-card" style={{ backgroundColor: theme.cardBackground }}>
            <h2 style={{ color: theme.secondary }}>Connect With Me</h2>
            
            <div className="info-item">
              <div className="info-icon" style={{ color: theme.primary }}>📧</div>
              <div className="info-content">
                <h3>Email</h3>
                <a href="mailto:connercharlesjordan@gmail.com" style={{ color: theme.link }}>
                  connercharlesjordan@gmail.com
                </a>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon" style={{ color: theme.primary }}>📱</div>
              <div className="info-content">
                <h3>Phone</h3>
                <a href="tel:+18059759793" style={{ color: theme.link }}>
                  +1 (805) 975-9793
                </a>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon" style={{ color: theme.primary }}>📍</div>
              <div className="info-content">
                <h3>Location</h3>
                <p>San Luis Obispo, CA</p>
              </div>
            </div>
            
            <div className="social-links">
              <a 
                href="https://linkedin.com/in/conner-jordan-4b268514a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn"
                style={{ backgroundColor: theme.primary }}
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/cjordan223" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn"
                style={{ backgroundColor: theme.primary }}
              >
                GitHub
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 