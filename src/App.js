import "./App.css";
import Directory from "./Directory";
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
      <Directory students={students} />
    </div>
  );
}

export default App;
