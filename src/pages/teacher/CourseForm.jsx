import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { errMsg } from '../../services/api';

export default function CourseForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [f, setF] = useState({ title: '', description: '', category: '' });
  const [video, setVideo] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    if (!id) return;
    api.get('/courses/' + id).then((r) => setF({ title: r.data.title, description: r.data.description, category: r.data.category }))
      .catch((e) => setError(errMsg(e)));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!id && !video) return setError('Please choose a video file');
    const data = new FormData();
    Object.entries(f).forEach(([k, v]) => data.append(k, v));
    if (video) data.append('video', video);
    if (thumb) data.append('thumbnail', thumb);
    setBusy(true); setError('');
    try {
      await (id ? api.put('/courses/' + id, data) : api.post('/courses', data));
      nav('/teacher/courses');
    } catch (err) { setError(errMsg(err)); }
    setBusy(false);
  };

  return (
    <form className="glass pad narrow form" onSubmit={submit}>
      <h1>{id ? 'Edit session' : 'Add session'}</h1>
      {error && <p className="error">{error}</p>}
      <input placeholder="Title" value={f.title} onChange={set('title')} required />
      <input placeholder="Category (e.g. Web Development)" value={f.category} onChange={set('category')} required />
      <textarea rows="4" placeholder="Description" value={f.description} onChange={set('description')} required />
      <label>Video {id && '(leave empty to keep current)'}
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      </label>
      <label>Thumbnail (optional)
        <input type="file" accept="image/*" onChange={(e) => setThumb(e.target.files[0])} />
      </label>
      <button className="btn" disabled={busy}>{busy ? 'Saving…' : id ? 'Save changes' : 'Publish session'}</button>
    </form>
  );
}
