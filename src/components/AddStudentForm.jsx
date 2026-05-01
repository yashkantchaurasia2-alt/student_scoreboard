import { useState } from 'react';
import { motion } from 'framer-motion';

const AddStudentForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name cannot be empty';
    }
    const scoreNum = Number(score);
    if (score === '' || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      newErrors.score = 'Score must be between 0 and 100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      // Simulate loading state
      setTimeout(() => {
        onAdd({ name: name.trim(), score: Number(score) });
        setName('');
        setScore('');
        setIsSubmitting(false);
      }, 800);
    }
  };

  return (
    <motion.div 
      className="add-student-container glass-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <form onSubmit={handleSubmit} className="add-student-form">
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            id="studentName"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="Enter name"
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="studentScore">Score (0-100)</label>
          <input
            id="studentScore"
            type="number"
            className="form-input"
            value={score}
            onChange={(e) => {
              setScore(e.target.value);
              if (errors.score) setErrors({ ...errors, score: null });
            }}
            placeholder="Enter score"
            min="0"
            max="100"
            disabled={isSubmitting}
          />
          {errors.score && <span className="error-message">{errors.score}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? <div className="spinner"></div> : 'Add Student'}
        </button>
      </form>
    </motion.div>
  );
};

export default AddStudentForm;
