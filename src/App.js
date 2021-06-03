import "./App.css";
import AllClasses from "./components/AllClasses";
import StudentDirectory from "./StudentDirectory";
import TeacherDirectory from "./TeacherDirectory";
import React, { Fragment, useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Calendar from "./Events/Calendar"
import Sidebar from "./Dashboard/Sidebar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
          textAlign: "center",
        }}
      >
        <CircularProgress />
        <p>Connecting to Database...</p>
      </div>
    );
  // if (!teachers) return <h1>loading...</h1>;
  // console.log("test", students);

  return (
    <div className="App">
      <Router>
      <Sidebar></Sidebar>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/AllClasses"><AllClasses /></Route>
        <Route path="/ClassPage"  />
        <Route path="/StudentDirectory"><StudentDirectory students={students} setStudents={setStudents} /></Route>
        <Route path="/TeacherDirectory"><TeacherDirectory teachers={teachers} setTeachers={setTeachers} /></Route>
        <Route path="/Calendar"  component={Calendar} />
       </Switch>
      </Router>
    </div>
  );
}
const Home = () => (
  <Fragment>
    <h1>Welcome!</h1>
  </Fragment>
  );

export default App;
