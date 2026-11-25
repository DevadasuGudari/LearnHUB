import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { errMsg } from '../../services/api';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try { const u = await login(f); nav('/' + u.role); }
    catch (err) { setError(errMsg(err)); }
    setBusy(false);
  };

  return (
    <form className="glass pad narrow form" onSubmit={submit}>
      <h1>Welcome back</h1>
      {error && <p className="error">{error}</p>}
      <input type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required />
      <input type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required />
      <button className="btn" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button>
      <small>New here? <Link to="/register">Create an account</Link></small>
    </form>
  );
}
