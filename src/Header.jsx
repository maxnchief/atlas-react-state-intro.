import { useContext } from "react";
import logo from "./assets/logo.png";
import { EnrolledCoursesContext } from "./App";

export default function Header() {
  const { enrolledCourses } = useContext(EnrolledCoursesContext);
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">
        Classes Enrolled: {enrolledCourses.length}
      </div>
    </div>
  );
}
