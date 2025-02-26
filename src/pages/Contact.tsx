import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log('Form submitted:', formData);
    // You could add API call to send email or store in database
  };

  return (
    <div className="contact-container">
      <h1>Get In Touch</h1>
      
      <div className="contact-grid">
        {/* Left column - Contact Form */}
        <div className="contact-card">
          <h2>Send Me a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                required
              />
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
        
        {/* Right column - Contact Info */}
        <div className="contact-card">
          <h2>Connect With Me</h2>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">📧</div>
            <div className="contact-info-content">
              <h3>Email</h3>
              <a href="mailto:connercharlesjordan@gmail.com">connercharlesjordan@gmail.com</a>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">📱</div>
            <div className="contact-info-content">
              <h3>Phone</h3>
              <a href="tel:+18059759793">+1 (805) 975-9793</a>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">📍</div>
            <div className="contact-info-content">
              <h3>Location</h3>
              <p>San Luis Obispo, CA</p>
            </div>
          </div>
          
          <div className="social-links-container">
            <a href="https://linkedin.com/in/conner-jordan-4b268514a" target="_blank" rel="noopener noreferrer" className="social-link linkedin">LinkedIn</a>
            <a href="https://github.com/cjordan223" target="_blank" rel="noopener noreferrer" className="social-link github">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 