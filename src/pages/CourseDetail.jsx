import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { errMsg } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [c, setC] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setC(null);
    setError('');

    api.get('/courses/' + id)
      .then((r) => setC(r.data))
      .catch((e) => setError(errMsg(e)));
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!c) {
    return <Loader />;
  }

  return (
    <div className="course-detail-page">

      <div className="glass course-detail-card">

        {c.thumbnail ? (
          <div className="course-detail-image">
            <img src={c.thumbnail} alt={c.title} />
          </div>
        ) : (
          <div className="course-detail-placeholder">
            🎓
          </div>
        )}

        <div className="course-detail-content">

          <span className="tag">{c.category}</span>

          <h1>{c.title}</h1>

          <div className="course-instructor">
            <div className="instructor-avatar">
              {c.teacher?.name?.charAt(0).toUpperCase() || 'T'}
            </div>
            <div>
              <small className="muted">Created by</small>
              <h4>{c.teacher?.name || 'Teacher'}</h4>
            </div>
          </div>

          <div className="course-description">
            <h2>About this session</h2>
            <p>{c.description}</p>
          </div>

          <div className="course-detail-actions">

            {user?.role === 'student' && (
              <Link
                className="btn"
                to={`/student/watch/${c._id}`}
              >
                ▶ Watch Session
              </Link>
            )}

            {!user && (
              <Link className="btn" to="/login">
                Log in to Watch
              </Link>
            )}

            {user?.role === 'teacher' && (
              <p className="muted">
                Teachers can preview sessions from their dashboard.
              </p>
            )}

            {user?.role === 'student' && (
              <Link className="back-link" to="/courses">
                ← Back to Courses
              </Link>
            )}

            {!user && (
              <Link className="back-link" to="/courses">
                ← Back to Courses
              </Link>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
