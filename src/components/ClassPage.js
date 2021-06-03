import React, { useEffect, useState, useContext } from "react";
import StudentGrades from "./StudentGrades"

function ClassPage(props){
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState([]);
  var class_id="U2L8HoOduUTS7yyENHO8";

  var student_list = [];
  const getTeacher = (teacher_id) => {
    const url = new URL("http://localhost:5000/classes/teacher_name")
    url.searchParams.append("teacher_id", teacher_id);
    fetch(url)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      setTeacher(obj.first_name + " " + obj.last_name);
    });
  }

  const getStudentGrade = (student_id) => {
    const url = new URL("http://localhost:5000/classes/student_grade");
    url.searchParams.append("student_id", student_id);
    fetch(url)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      console.log(obj);
      var temp = (<StudentGrades
        first_name={obj.first_name}
        last_name={obj.last_name}
        grade={obj.class_grade}
        update_list={updateClassInfo}
        class_id={class_id}
        key={student_id}
      />)
      student_list.push(temp);
      console.log(temp);
    })
    .then((temp) => {
      return;
    });
  }

  const updateClassInfo = () => {
    const url = new URL("http://localhost:5000/classes/get_class")
    url.searchParams.append("class_id", class_id);
    fetch(url)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      getTeacher(obj.teacher_id);
      console.log(obj.students);
      student_list = obj.students.map((o) => (
        <StudentGrades
          update={updateClassInfo}
          key={o}
          class_id={class_id}
          student_id={o}
        />
      ));
      console.log(student_list);
      setStudents(student_list);
      return students;
    });
  }

  useEffect(() => {
    updateClassInfo();
  }, []);

  const addStudent = () => {

  };


  return (
    <div>
      <h1>Class</h1>
      <div className="row row-cust">
        <p>Teacher: {teacher}</p>
      </div>
      <div id="addButton">
        <button className="btn-custom" onClick={() => addStudent()}>
          Add Student
        </button>
      </div>
      {students}
    </div>
  );
}

export default ClassPage;
