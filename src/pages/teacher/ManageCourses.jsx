import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errMsg } from '../../services/api';
import CourseCard from '../../components/CourseCard';
import Loader from '../../components/Loader';

export default function ManageCourses() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/courses/mine').then((r) => setCourses(r.data)).catch((e) => setError(errMsg(e)));
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this session?')) return;
    try {
      await api.delete('/courses/' + id);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (e) { setError(errMsg(e)); }
  };

  if (!courses && !error) return <Loader />;
  return (
    <>
      <h1>My sessions</h1>
      {error && <p className="error">{error}</p>}
      {courses?.length === 0 && <p className="muted">You haven’t added a session yet. <Link to="/teacher/add">Add your first one</Link>.</p>}
      <div className="grid">
        {courses?.map((c) => (
          <CourseCard key={c._id} c={c} to={`/teacher/preview/${c._id}`}>
            <div className="row">
              <Link className="btn small" to={`/teacher/preview/${c._id}`}>Preview</Link>
              <Link className="btn small ghost" to={`/teacher/edit/${c._id}`}>Edit</Link>
              <button className="btn small danger" onClick={() => remove(c._id)}>Delete</button>
            </div>
          </CourseCard>
        ))}
      </div>
    </>
  );
}
