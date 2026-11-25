import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <p className="muted">Loading profile...</p>;
  }

  const rows = [
    ['Name', user.name],
    ['Email', user.email],
    ['Role', user.role],
    ['Bio', user.bio || 'No bio added yet'],
    [
      'Joined',
      user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : 'Not available'
    ]
  ];

  return (
    <div className="profile-page">

      <div className="glass profile-card">

        <div className="profile-header">
          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>

          <h1>My Profile</h1>
          <p>Manage and view your account information</p>

          <span className="profile-role">
            {user.role?.toUpperCase()}
          </span>
        </div>

        <div className="profile-details">
          <h2>Personal Information</h2>

          {rows.map(([k, v]) => (
            <div className="profile-row" key={k}>
              <span className="profile-label">{k}</span>
              <span className="profile-value">{v}</span>
            </div>
          ))}
        </div>

        <div className="profile-footer">
          🎓 Welcome to LearnHUB
        </div>

      </div>

    </div>
  );
}
