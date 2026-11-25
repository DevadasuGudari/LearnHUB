import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import CourseCard from '../../components/CourseCard';

export default function StudentHome() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  useEffect(() => { api.get('/courses').then((r) => setCourses(r.data.slice(0, 3))); }, []);
  return (
    <>
      <div className="glass pad">
        <h1>Hello, {user.name} 👋</h1>
        <p>Pick a session below and start learning.</p>
        <Link className="btn" to="/student/courses">Browse all sessions</Link>
      </div>
      <h2>Latest sessions</h2>
      {courses.length === 0 && <p className="muted">No sessions yet. Check back soon.</p>}
      <div className="grid">
        {courses.map((c) => <CourseCard key={c._id} c={c} to={`/student/watch/${c._id}`} />)}
      </div>
    </>
  );
}
