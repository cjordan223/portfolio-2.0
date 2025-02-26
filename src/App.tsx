import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Import theme provider
import { ThemeProvider } from './themes/ThemeContext';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import CoursePage from './pages/CoursePage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/resume" element={<Layout><Resume /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/course/:courseId" element={<Layout><CoursePage /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
