import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function TeacherHome() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  useEffect(() => { api.get('/courses/mine').then((r) => setCourses(r.data)); }, []);
  const cats = new Set(courses.map((c) => c.category)).size;
  return (
    <>
      <div className="glass pad">
        <h1>Welcome, {user.name} 👋</h1>
        <p>Create sessions and share your knowledge.</p>
        <div className="row">
          <Link className="btn" to="/teacher/add">Add session</Link>
          <Link className="btn ghost" to="/teacher/courses">Manage sessions</Link>
        </div>
      </div>
      <div className="grid">
        <div className="glass pad center-text"><h2>{courses.length}</h2><p>Sessions</p></div>
        <div className="glass pad center-text"><h2>{cats}</h2><p>Categories</p></div>
      </div>
    </>
  );
}
