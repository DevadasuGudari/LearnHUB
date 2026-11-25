import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menus = {
  student: [
    ['/student', 'Dashboard'],
    ['/student/courses', 'Browse Sessions'],
    ['/student/profile', 'Profile']
  ],
  teacher: [
    ['/teacher', 'Dashboard'],
    ['/teacher/courses', 'My Sessions'],
    ['/teacher/add', 'Add Session'],
    ['/teacher/profile', 'Profile']
  ]
};

export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <div className="dash">
      <aside className="glass sidebar">

        <div className="logo">🎓 LearnHUB</div>

        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h4>{user?.name || 'User'}</h4>
            <small className="muted">{role}</small>
          </div>
        </div>

        <p className="sidebar-heading">MENU</p>

        <nav className="sidebar-nav">
          {menus[role]?.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === `/${role}`}
            >
              {label}
            </NavLink>
          ))}

          <NavLink to="/">Public Site</NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button className="btn logout-btn" onClick={handleLogout}>
            ↪ Logout
          </button>
        </div>

      </aside>

      <section className="dash-main">
        <Outlet />
      </section>
    </div>
  );
}