import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../uploads');

const storage = multer.diskStorage({
  destination: dir,
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e6) + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
  const ok = file.fieldname === 'video' ? file.mimetype.startsWith('video/') : file.mimetype.startsWith('image/');
  cb(ok ? null : new Error(`Invalid file type for ${file.fieldname}`), ok);
};

export default multer({ storage, fileFilter, limits: { fileSize: 500 * 1024 * 1024 } })
  .fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);
