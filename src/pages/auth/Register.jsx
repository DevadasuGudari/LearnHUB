import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { errMsg } from '../../services/api';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '', role: 'student', bio: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (f.password.length < 6) return setError('Password must be at least 6 characters');
    setBusy(true); setError('');
    try { const u = await register(f); nav('/' + u.role); }
    catch (err) { setError(errMsg(err)); }
    setBusy(false);
  };

  return (
    <form className="glass pad narrow form" onSubmit={submit}>
      <h1>Create your account</h1>
      {error && <p className="error">{error}</p>}
      <div className="row">
        {['student', 'teacher'].map((r) => (
          <label key={r} className={f.role === r ? 'pick on' : 'pick'}>
            <input type="radio" name="role" value={r} checked={f.role === r} onChange={set('role')} hidden />
            {r === 'student' ? '🎒 Student' : '🧑‍🏫 Teacher'}
          </label>
        ))}
      </div>
      <input placeholder="Full name" value={f.name} onChange={set('name')} required />
      <input type="email" placeholder="Email" value={f.email} onChange={set('email')} required />
      <input type="password" placeholder="Password (min 6 characters)" value={f.password} onChange={set('password')} required />
      <textarea rows="3" placeholder="Short bio (optional)" value={f.bio} onChange={set('bio')} />
      <button className="btn" disabled={busy}>{busy ? 'Creating…' : 'Sign up'}</button>
      <small>Already registered? <Link to="/login">Log in</Link></small>
    </form>
  );
}
