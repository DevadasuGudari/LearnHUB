import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-page">

      <div className="glass notfound-card">

        <div className="notfound-icon">🔍</div>

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist,
          may have been moved, or the link might be incorrect.
        </p>

        <Link className="btn notfound-btn" to="/">
          ← Back to Home
        </Link>

        <div className="notfound-footer">
          🎓 LearnHUB • Learn something new every day
        </div>

      </div>

    </div>
  );
}
