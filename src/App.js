import "./App.css";
import StudentDirectory from "./StudentDirectory";
import React, { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/student/directory")
      .then((resp) => resp.json())
      .then((resp) => setStudents(resp));
  }, [setStudents]);

  if (!students) return <h1>loading...</h1>;
  // console.log("test", students);

  return (
    <div>
      <StudentDirectory students={students} setStudents={setStudents} />
    </div>
  );
}

export default App;
