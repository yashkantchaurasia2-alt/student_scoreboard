import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const StudentRow = ({ student, isTopper, onUpdateScore }) => {
  const [newScore, setNewScore] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPass = student.score >= 40;
  
  const handleUpdate = (e) => {
    e.preventDefault();
    const scoreNum = Number(newScore);
    if (newScore !== '' && !isNaN(scoreNum) && scoreNum >= 0 && scoreNum <= 100) {
      setIsUpdating(true);
      setTimeout(() => {
        onUpdateScore(student.id, scoreNum);
        setNewScore('');
        setIsUpdating(false);
      }, 300);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  const progressColor = isPass ? 'var(--pass-color)' : 'var(--fail-color)';
  const progressGlow = isPass ? 'var(--pass-glow)' : 'var(--fail-glow)';

  return (
    <motion.div 
      className={`student-card glass-panel ${isTopper ? 'is-topper' : ''}`}
      variants={itemVariants}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {isTopper && (
        <motion.div 
          className="topper-badge"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          🏆
        </motion.div>
      )}

      <div className="student-info">
        <span className="student-name">{student.name}</span>
        <span className={`student-status ${isPass ? 'status-pass' : 'status-fail'}`}>
          {isPass ? 'Pass' : 'Fail'}
        </span>
      </div>

      <div className="score-indicator-container">
        <div 
          className="circular-progress" 
          style={{ 
            '--score': student.score,
            '--progress-color': progressColor,
            '--progress-glow': progressGlow
          }}
        >
          <span className="score-value">{student.score}</span>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="update-score-form">
        <input
          type="number"
          className="update-input"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
          placeholder="New Score"
          min="0"
          max="100"
          disabled={isUpdating}
        />
        <button 
          type="submit" 
          className="update-btn"
          disabled={isUpdating || newScore === ''}
        >
          Update
        </button>
      </form>
    </motion.div>
  );
};

export default StudentRow;
