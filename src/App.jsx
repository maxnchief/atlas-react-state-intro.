import { createContext, useState } from "react";
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";

export const EnrolledCoursesContext = createContext();

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const addEnrolledCourse = (course) => {
    setEnrolledCourses((prev) => {
      // Prevent duplicates by courseNumber
      if (prev.some((c) => c.courseNumber === course.courseNumber)) return prev;
      return [...prev, course];
    });
  };

  const removeEnrolledCourse = (courseNumber) => {
    setEnrolledCourses((prev) =>
      prev.filter((c) => c.courseNumber !== courseNumber)
    );
  };

  return (
    <EnrolledCoursesContext.Provider
      value={{ enrolledCourses, addEnrolledCourse, removeEnrolledCourse }}
    >
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrolledCoursesContext.Provider>
  );
}
