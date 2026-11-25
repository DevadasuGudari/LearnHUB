import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    nav('/');
  };

  return (
    <>
      <header className="glass navbar">
        <Link to="/" className="logo" onClick={close}>
          🎓 LearnHUB
        </Link>

        <button
          className="burger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={open ? 'links show' : 'links'}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/courses" onClick={close}>Courses</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>

          {user ? (
            <>
              <Link className="btn small dashboard-btn"
                to={`/${user.role}`} onClick={close}>
                Dashboard
              </Link>

              <button
                className="btn small logout-btn"
                onClick={handleLogout}
              >
                ↪ Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={close}>Login</Link>
              <Link className="btn small join-btn"
                to="/register" onClick={close}>
                Join Free
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        Learn • Teach • Practice • Grow 🚀
        <br />
        © {new Date().getFullYear()} LearnHUB. All rights reserved.
      </footer>
    </>
  );
}