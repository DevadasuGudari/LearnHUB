import { useEffect, useState } from 'react';
import api, { errMsg } from '../services/api';
import CourseCard from './CourseCard';
import Loader from './Loader';
import './CourseList.css';

export default function CourseList({ base }) {
  const [courses, setCourses] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setError('');

      api.get('/courses', { params: { q } })
        .then((r) => setCourses(r.data))
        .catch((e) => {
          setError(errMsg(e));
          setCourses([]);
        });
    }, 300);

    return () => clearTimeout(t);
  }, [q]);

  return (
    <section className="course-list-section">

      {/* Header */}
      <div className="course-list-header">
        <div>
          <span className="section-label">LEARNHUB LEARNING</span>
          <h2>Explore Learning Sessions</h2>
          <p>Discover new skills and expand your knowledge with our learning sessions.</p>
        </div>

        {courses && !error && (
          <div className="course-count">
            {courses.length} {courses.length === 1 ? 'Session' : 'Sessions'}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="course-search-wrapper">
        <span className="search-icon">⌕</span>

        <input
          className="course-search"
          type="text"
          placeholder="Search sessions by title..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        {q && (
          <button
            className="clear-search"
            onClick={() => setQ('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="course-error">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* Loading */}
      {!courses && !error && (
        <div className="course-loading">
          <Loader />
        </div>
      )}

      {/* Empty State */}
      {courses && courses.length === 0 && !error && (
        <div className="course-empty">
          <div className="empty-icon">📚</div>
          <h3>No Learning Sessions Found</h3>
          <p>
            {q
              ? 'Try searching with a different keyword.'
              : 'No sessions are available right now. Please check back later.'}
          </p>

          {q && (
            <button onClick={() => setQ('')}>
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Course Grid */}
      {courses && courses.length > 0 && !error && (
        <div className="course-grid">
          {courses.map((c) => (
            <CourseCard
              key={c._id}
              c={c}
              to={`${base}/${c._id}`}
            />
          ))}
        </div>
      )}

    </section>
  );
}
