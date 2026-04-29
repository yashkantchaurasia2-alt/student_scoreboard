import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ totalStudents, averageScore, theme, toggleTheme }) => {
  return (
    <motion.header 
      className="header glass-panel"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <h1>Student Scoreboard</h1>
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Total Students</span>
          <span className="stat-value">{totalStudents}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Score</span>
          <span className="stat-value">{averageScore}</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
