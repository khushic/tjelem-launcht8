import "./App.css";
import StudentDirectory from "./StudentDirectory";
import TeacherDirectory from "./TeacherDirectory";
import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/student/directory")
      .then((resp) => resp.json())
      .then((resp) => setStudents(resp));
  }, [setStudents]);

  useEffect(() => {
    fetch("http://localhost:8000/teacher/directory")
      .then((resp) => resp.json())
      .then((resp) => setTeachers(resp));
  }, [setTeachers]);

  if (!students || !teachers)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </div>
    );
  // if (!teachers) return <h1>loading...</h1>;
  // console.log("test", students);

  return (
    <div>
      <StudentDirectory students={students} setStudents={setStudents} />
      <TeacherDirectory teachers={teachers} setTeachers={setTeachers} />
    </div>
  );
}

export default App;
