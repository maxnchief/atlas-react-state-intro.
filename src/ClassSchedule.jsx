import { useContext } from "react";
import { EnrolledCoursesContext } from "./App";

export default function ClassSchedule() {
  const { enrolledCourses, removeEnrolledCourse } = useContext(
    EnrolledCoursesContext
  );
  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No enrolled courses
              </td>
            </tr>
          ) : (
            enrolledCourses.map((course) => (
              <tr key={course.courseNumber}>
                <td>{course.courseNumber}</td>
                <td>{course.courseName}</td>
                <td>
                  <button
                    onClick={() => removeEnrolledCourse(course.courseNumber)}
                  >
                    Drop
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
