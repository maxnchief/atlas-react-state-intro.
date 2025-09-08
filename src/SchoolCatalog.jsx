import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetch("/api/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  const filteredCourses = courses.filter((course) => {
    const searchLower = search.toLowerCase();
    return (
      course.courseNumber?.toLowerCase().includes(searchLower) ||
      course.courseName?.toLowerCase().includes(searchLower)
    );
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortColumn) return 0;
    let aValue = a[sortColumn];
    let bValue = b[sortColumn];
    // Handle numbers and strings
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Helper to show sort arrow
  const renderSortArrow = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>
              Trimester{renderSortArrow("trimester")}
            </th>
            <th onClick={() => handleSort("courseNumber")}>
              Course Number{renderSortArrow("courseNumber")}
            </th>
            <th onClick={() => handleSort("courseName")}>
              Courses Name{renderSortArrow("courseName")}
            </th>
            <th onClick={() => handleSort("semesterCredits")}>
              Semester Credits{renderSortArrow("semesterCredits")}
            </th>
            <th onClick={() => handleSort("totalClockHours")}>
              Total Clock Hours{renderSortArrow("totalClockHours")}
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course, idx) => (
            <tr key={idx}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
