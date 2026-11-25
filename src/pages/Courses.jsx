import CourseList from '../components/CourseList';

export default function Courses() {
  return (
    <div className="courses-page">

      <section className="courses-hero">
        <span className="courses-tag">EXPLORE & LEARN</span>

        <h1>
          Discover Your Next <span>Learning Journey</span>
        </h1>

        <p>
          Explore learning sessions, develop new skills,
          and learn from experienced teachers at your own pace.
        </p>
      </section>

      <section className="courses-content">
        <div className="courses-heading">
          <div>
            <h2>Explore All Courses</h2>
            <p>Find the right session for your learning goals.</p>
          </div>
          <span className="course-icon">🎓</span>
        </div>

        <CourseList base="/courses" />
      </section>

    </div>
  );
}
