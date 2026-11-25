import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(root, 'uploads')));

// Express 4 doesn't catch rejected promises, so wrap every async handler
const wrap = (router) => {
  router.stack.forEach((layer) => {
    if (!layer.route) return;
    layer.route.stack.forEach((l) => {
      const fn = l.handle;
      if (fn.length <= 3) l.handle = (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
    });
  });
  return router;
};
app.use('/api/users', wrap(userRoutes));
app.use('/api/courses', wrap(courseRoutes));

const dist = path.join(root, 'dist');
if ((process.env.NODE_ENV === 'production' || process.argv.includes('--prod')) && fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, req, res, next) => {
  const validation = err.name === 'ValidationError';
  const message = validation ? Object.values(err.errors).map((e) => e.message).join(', ') : err.message;
  res.status(err.status || (validation || err.name === 'MulterError' || err.name === 'CastError' ? 400 : 500)).json({ message });
});

connectDB()
  .then(() => app.listen(PORT, () => console.log('Server running on port ' + PORT)))
  .catch((e) => { console.error('DB connection failed:', e.message); process.exit(1); });
