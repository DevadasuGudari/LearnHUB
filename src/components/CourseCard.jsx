import { Link } from 'react-router-dom';

export default function CourseCard({ c, to, children }) {
  return (
    <div className="glass card course-card">

      {/* Course Thumbnail */}
      <Link to={to} className="course-image">
        {c.thumbnail ? (
          <img src={c.thumbnail} alt={c.title} />
        ) : (
          <div className="thumb">
            <span>🎓</span>
          </div>
        )}

        <span className="course-overlay">View Course →</span>
      </Link>

      {/* Course Details */}
      <div className="course-content">

        <span className="tag">{c.category}</span>

        <h3>{c.title}</h3>

        <p className="course-description">
          {c.description?.length > 90
            ? c.description.slice(0, 90) + '...'
            : c.description || 'Explore this course and improve your skills.'}
        </p>

        {/* Teacher */}
        <div className="course-footer">
          <div className="teacher-info">
            <span className="teacher-icon">👨‍🏫</span>
            <div>
              <small>Instructor</small>
              <strong>{c.teacher?.name || 'Teacher'}</strong>
            </div>
          </div>
        </div>

        {/* Additional Buttons */}
        {children && (
          <div className="course-actions">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}
