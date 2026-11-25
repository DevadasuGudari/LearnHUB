export default function About() {
  return (
    <div className="about-page">

      <section className="glass about-hero">
        <span className="about-tag">ABOUT OUR PLATFORM</span>
        <h1>Welcome to <span>LearnHUB</span></h1>
        <p>
          LearnHUB is an online learning platform that connects teachers
          and students. Teachers can publish video sessions, while
          students can explore and learn at their own pace.
        </p>
      </section>

      <section className="about-features">
        <div className="glass about-card">
          <div className="about-icon">🎓</div>
          <h2>For Students</h2>
          <p>
            Discover new skills and learn from video sessions
            whenever and wherever you want.
          </p>
          <ul>
            <li>Register and create your account</li>
            <li>Browse and search learning sessions</li>
            <li>Watch educational videos</li>
            <li>Manage your learning profile</li>
          </ul>
        </div>

        <div className="glass about-card">
          <div className="about-icon">👨‍🏫</div>
          <h2>For Teachers</h2>
          <p>
            Share your knowledge by creating and managing
            learning sessions for students.
          </p>
          <ul>
            <li>Create and publish sessions</li>
            <li>Upload videos and thumbnails</li>
            <li>Preview learning content</li>
            <li>Edit or delete your sessions</li>
          </ul>
        </div>
      </section>

      <section className="glass about-mission">
        <h2>Our Mission 🚀</h2>
        <p>
          Our goal is to make learning simple, accessible, and engaging
          by bringing teachers and students together on one platform.
        </p>
        <h3>Learn • Teach • Practice • Grow</h3>
      </section>

    </div>
  );
}
