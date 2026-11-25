import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  [
    '🎥',
    'Video Learning',
    'Watch teacher-made learning sessions anytime and on any device.'
  ],
  [
    '🧑‍🏫',
    'Teach Your Way',
    'Upload videos, organise sessions, and manage your learning content.'
  ],
  [
    '🔐',
    'Secure Access',
    'Separate student and teacher dashboards protected by authentication.'
  ]
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">

      <section className="home-hero">
        <div className="hero-content">

          <span className="hero-tag">
            WELCOME TO LEARNHUB
          </span>

          <h1>
            Learn <span>.</span> Teach <span>.</span>
            Practice <span>.</span> Grow <span>🚀</span>
          </h1>

          <p>
            LearnHUB connects students and teachers through
            simple, engaging, and video-based learning sessions.
            Discover new skills and grow at your own pace.
          </p>

          <div className="hero-buttons">
            <Link
              className="btn primary-btn"
              to={user ? `/${user.role}` : '/register'}
            >
              {user ? 'Open Dashboard →' : 'Create Free Account →'}
            </Link>

            <Link className="btn secondary-btn" to="/courses">
              Explore Courses
            </Link>
          </div>

          <div className="hero-note">
            ✨ Learn something new. Every single day.
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            <span>🎓</span>
          </div>
          <div className="floating-card card-one">
            🎥 Video Sessions
          </div>
          <div className="floating-card card-two">
            📚 Keep Learning
          </div>
        </div>
      </section>

      <section className="home-features">

        <div className="section-heading">
          <span>WHY LEARNHUB?</span>
          <h2>Everything You Need to Learn</h2>
          <p>
            A simple platform designed to make teaching and learning easier.
          </p>
        </div>

        <div className="feature-grid">
          {features.map(([icon, title, text]) => (
            <div className="glass feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

      </section>

      <section className="glass home-cta">
        <h2>Ready to Start Your Learning Journey?</h2>
        <p>
          Join LearnHUB and explore a world of learning opportunities.
        </p>
        <Link className="btn primary-btn" to="/courses">
          Start Exploring →
        </Link>
      </section>

    </div>
  );
}