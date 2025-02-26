import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../themes/ThemeContext';
import { motion } from 'framer-motion';
import axios from 'axios';

// Interface for GitHub commit data
interface Commit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

const Sandbox: React.FC = () => {
  const { theme } = useTheme();
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for mini-games and interactive elements
  const [counter, setCounter] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#39ff14', '#ff00ff', '#00aaff', '#ffaa00', '#ff0000'];

  // Fetch GitHub commits
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true);
        // Replace with your actual GitHub username and repo
        const response = await axios.get(
          'https://api.github.com/repos/octocat/hello-world/commits',
          { params: { per_page: 5 } }
        );
        setCommits(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching commits:', err);
        setError('Failed to load GitHub commits. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Layout>
      <div className="sandbox-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: theme.primary, marginBottom: '2rem', textAlign: 'center' }}
        >
          Interactive Sandbox
        </motion.h1>

        <motion.div
          className="sandbox-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Interactive Card 1: Counter */}
          <motion.div 
            className="interactive-card" 
            variants={itemVariants}
            style={{ backgroundColor: theme.cardBackground }}
          >
            <h2 style={{ color: theme.secondary }}>Interactive Counter</h2>
            <div className="counter-section">
              <motion.div
                className="counter-display"
                animate={{
                  scale: [1, 1.2, 1],
                  color: counter % 5 === 0 && counter !== 0 ? theme.accent : theme.primary,
                }}
                transition={{ duration: 0.3 }}
                style={{ color: theme.primary }}
              >
                {counter}
              </motion.div>
              <div className="counter-buttons">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCounter(prev => prev - 1)}
                  style={{ 
                    backgroundColor: theme.cardBackground,
                    color: theme.secondary,
                    borderColor: theme.border
                  }}
                >
                  Decrement
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCounter(0)}
                  style={{ 
                    backgroundColor: theme.cardBackground,
                    color: theme.warning,
                    borderColor: theme.border
                  }}
                >
                  Reset
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCounter(prev => prev + 1)}
                  style={{ 
                    backgroundColor: theme.cardBackground,
                    color: theme.primary,
                    borderColor: theme.border
                  }}
                >
                  Increment
                </motion.button>
              </div>
              <p className="counter-message">
                {counter % 5 === 0 && counter !== 0 ? (
                  <span style={{ color: theme.accent }}>You hit a multiple of 5!</span>
                ) : (
                  <span>Keep clicking to see what happens...</span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Interactive Card 2: Color Changer */}
          <motion.div 
            className="interactive-card" 
            variants={itemVariants}
            style={{ backgroundColor: theme.cardBackground }}
          >
            <h2 style={{ color: theme.secondary }}>Interactive Color Playground</h2>
            <div className="color-section">
              <motion.div
                className="color-box"
                animate={{ 
                  backgroundColor: colors[colorIndex],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)}
                style={{ 
                  backgroundColor: theme.cardBackground,
                  color: theme.primary,
                  borderColor: theme.border
                }}
              >
                Change Color
              </motion.button>
              <p>Click the button to cycle through different colors</p>
            </div>
          </motion.div>
          
          {/* GitHub Commits Feed */}
          <motion.div 
            className="interactive-card github-card" 
            variants={itemVariants}
            style={{ backgroundColor: theme.cardBackground }}
          >
            <h2 style={{ color: theme.secondary }}>GitHub Activity Feed</h2>
            <div className="github-feed">
              {loading ? (
                <div className="loading">Loading commits...</div>
              ) : error ? (
                <div className="error" style={{ color: theme.error }}>{error}</div>
              ) : (
                <>
                  <p className="github-info">Recent commits from the repository:</p>
                  <ul className="commit-list">
                    {commits.map((commit) => (
                      <motion.li 
                        key={commit.sha}
                        className="commit-item"
                        whileHover={{ 
                          x: 5,
                          backgroundColor: `${theme.secondary}15`,
                        }}
                      >
                        <a 
                          href={commit.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: theme.primary }}
                        >
                          <div className="commit-message">{commit.commit.message}</div>
                          <div className="commit-info">
                            <span className="commit-author">{commit.commit.author.name}</span>
                            <span className="commit-date" style={{ color: theme.secondary }}>
                              {formatDate(commit.commit.author.date)}
                            </span>
                          </div>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .sandbox-container {
          padding: 2rem 0;
        }

        .sandbox-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .interactive-card {
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .interactive-card:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .github-card {
          grid-column: 1 / -1;
        }

        .counter-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 1rem;
        }

        .counter-display {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .counter-buttons {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .counter-message {
          height: 24px;
          text-align: center;
        }

        .color-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 1rem;
        }

        .color-box {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .github-feed {
          margin-top: 1rem;
        }

        .github-info {
          margin-bottom: 1rem;
        }

        .commit-list {
          list-style-type: none;
          padding: 0;
        }

        .commit-item {
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
          transition: all 0.2s ease;
        }

        .commit-item a {
          text-decoration: none;
          display: block;
        }

        .commit-message {
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .commit-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .loading, .error {
          text-align: center;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .sandbox-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Sandbox; 