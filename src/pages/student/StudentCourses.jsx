import CourseList from '../../components/CourseList';

export default function StudentCourses() {
  return (
    <>
      <h1>Learning sessions</h1>
      <CourseList base="/student/watch" />
    </>
  );
}
