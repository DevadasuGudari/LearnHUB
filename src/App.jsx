import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentHome from './pages/student/StudentHome';
import StudentCourses from './pages/student/StudentCourses';
import Watch from './pages/Watch';
import Profile from './pages/Profile';
import TeacherHome from './pages/teacher/TeacherHome';
import ManageCourses from './pages/teacher/ManageCourses';
import CourseForm from './pages/teacher/CourseForm';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route index element={<StudentHome />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="watch/:id" element={<Watch back="/student/courses" />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="teacher" />}>
        <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
          <Route index element={<TeacherHome />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="add" element={<CourseForm />} />
          <Route path="edit/:id" element={<CourseForm />} />
          <Route path="preview/:id" element={<Watch back="/teacher/courses" />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}
