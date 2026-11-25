import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { errMsg } from '../services/api';
import Loader from '../components/Loader';

export default function Watch({ back }) {
  const { id } = useParams();

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
    <div className="watch-page">

      <div className="watch-top">
        <Link className="watch-back" to={back}>
          ← Back to Sessions
        </Link>
        <span className="watch-label">🎓 LEARNHUB PLAYER</span>
      </div>

      <div className="glass watch-card">

        <div className="video-container">
          {c.videoUrl ? (
            <video
              className="course-video"
              controls
              controlsList="nodownload"
              poster={c.thumbnail || undefined}
              src={c.videoUrl}
              preload="metadata"
            >
              Your browser does not support HTML video.
            </video>
          ) : (
            <div className="video-unavailable">
              <span>🎥</span>
              <h2>Video Not Available</h2>
              <p>The video for this session has not been uploaded yet.</p>
            </div>
          )}
        </div>

        <div className="watch-content">

          <span className="tag">{c.category}</span>

          <h1>{c.title}</h1>

          <div className="watch-instructor">
            <div className="watch-avatar">
              {c.teacher?.name?.charAt(0).toUpperCase() || 'T'}
            </div>

            <div>
              <small className="muted">Instructor</small>
              <h4>{c.teacher?.name || 'Teacher'}</h4>
            </div>
          </div>

          <div className="watch-description">
            <h2>About this Session</h2>
            <p>{c.description}</p>
          </div>

        </div>
      </div>

      <div className="watch-footer">
        🚀 Keep learning and improving your skills with LearnHUB.
      </div>

    </div>
  );
}
