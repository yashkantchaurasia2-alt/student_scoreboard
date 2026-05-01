import { motion } from 'framer-motion';
import StudentRow from './StudentRow';

const StudentTable = ({ students, topperId, onUpdateScore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  if (students.length === 0) {
    return (
      <motion.div 
        className="glass-panel empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <h2>No students found</h2>
        <p>Add some students to see them on the scoreboard.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="student-grid"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {students.map((student) => (
        <StudentRow 
          key={student.id} 
          student={student} 
          isTopper={student.id === topperId}
          onUpdateScore={onUpdateScore}
        />
      ))}
    </motion.div>
  );
};

export default StudentTable;
