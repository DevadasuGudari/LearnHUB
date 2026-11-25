# 🎓 LearnHUB — Learn • Teach • Practice • Grow 🚀

Unified MERN app: React (Vite) in `src/`, Express in `server/`, one root `package.json`.

## Setup
1. Install Node 18+ and MongoDB (running locally, or use a MongoDB Atlas URI).
2. `npm install`
3. Edit `.env` (`MONGO_URI`, `JWT_SECRET`).
4. `npm run dev` → open http://localhost:5173 (API on :5000)

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | React + Express together |
| `npm run client` | Vite only |
| `npm run server` | Express only (nodemon) |
| `npm run build` | Build React into `dist/` |
| `npm start` | Production: Express serves API + `dist/` on :5000 |

## Pages
Public: Home, About, Contact, Courses, Course detail, Login, Register, 404
Student: Dashboard, Browse sessions, Watch, Profile
Teacher: Dashboard, My sessions (preview/edit/delete), Add/Edit session, Profile

## API
`POST /api/users/register` · `POST /api/users/login` · `GET /api/users/profile`
`GET /api/courses` · `GET /api/courses/mine` (teacher) · `GET /api/courses/:id`
`POST /api/courses` · `PUT /api/courses/:id` · `DELETE /api/courses/:id` (teacher, owner only)

## Testing checklist
1. Register a teacher → Add session (video + optional thumbnail) → see it under My sessions → Preview/Edit/Delete.
2. Register a student (another browser/incognito) → Browse sessions → Watch video.
3. As student open `/teacher` → redirected to `/student`; logged out → redirected to `/login`.
4. `npm run build && npm start` → app works on http://localhost:5000.
