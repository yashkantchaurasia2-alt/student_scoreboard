import { useState, useEffect } from 'react';
import Header from './components/Header';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing local storage data", e);
      }
    }
    return [
      { id: 1, name: 'Anshi ', score: 95 },
      { id: 2, name: 'Palak', score: 74 },
      { id: 3, name: 'Ansh', score: 92 },
      { id: 4, name: 'Dhruv', score: 78 },
      { id: 5, name: 'Naman', score: 88 },
      { id: 6, name: 'Aashi', score: 22 },
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: Date.now() }]);
  };

  const updateScore = (id, newScore) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, score: newScore } : student
      )
    );
  };

  // Filter students
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered students descending by score
  const sortedStudents = [...filteredStudents].sort((a, b) => b.score - a.score);

  // Calculate stats based on ALL students
  const totalStudents = students.length;
  const averageScore = totalStudents > 0
    ? Math.round(students.reduce((acc, curr) => acc + curr.score, 0) / totalStudents)
    : 0;

  // Identify topper from the filtered list
  const topperId = sortedStudents.length > 0 && sortedStudents[0].score > 0
    ? sortedStudents[0].id
    : null;

  return (
    <div className="app-container">
      <Header
        totalStudents={totalStudents}
        averageScore={averageScore}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search students by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <AddStudentForm onAdd={addStudent} />
      </div>

      <StudentTable
        students={sortedStudents}
        topperId={topperId}
        onUpdateScore={updateScore}
      />
    </div>
  );
}

export default App;
