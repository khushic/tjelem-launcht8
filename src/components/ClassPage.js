import React, { useEffect, useState, useContext } from "react";
import StudentGrades from "./StudentGrades"
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

function ClassPage(props){
  const [students, setStudents] = useState([]);
  const [grade, setGrade] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [newStudents, setNewStudents] = useState([]);
  var class_id="U2L8HoOduUTS7yyENHO8";

  var student_list = [];
  const getTeacher = (teacher_id) => {
    const url = new URL("http://localhost:8000/classes/teacher_name")
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
    const url = new URL("http://localhost:8000/classes/student_grade");
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
    const url = new URL("http://localhost:8000/classes/get_class")
    url.searchParams.append("class_id", class_id);
    fetch(url)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      console.log(obj);
      getTeacher(obj.teacher_id);
      if(obj.grade_resource == 1){
        setGrade("1st");
      }
      else if(obj.grade_resource == 2){
        setGrade("2nd");
      }
      else{
        setGrade(obj.grade_resource+"th");
      }
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
    updateSelectDropdown();
    updateSelectDropdown();
    updateSelectDropdown();
  }

  const updateSelectDropdown = () => {
    const url = new URL("http://localhost:8000/classes/get_all_students")
    url.searchParams.append("class_id", class_id);
    fetch(url)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      var newStud = obj.map((o) => (
        <option value={o.id}>{o.last_name}, {o.first_name}</option>
      ));
      setNewStudents(newStud);
      return newStud;
    });
  }

  useEffect(() => {
    updateClassInfo();
    document.getElementById("add-student-div").classList.add("invisible_cust");
  }, []);

  useEffect(() => {
    console.log("hi");
    console.log(students);
  }, [students]);

  const addStudent = () => {
    document.getElementById("add-student-div").classList.remove("invisible_cust");
    document.getElementById("editStudents").classList.add("invisible_cust");
  }

  const cancelEdit = () => {
    document.getElementById("add-student-div").classList.add("invisible_cust");
    document.getElementById("editStudents").classList.remove("invisible_cust");
  }

  const updateStudent = () => {
    var e = document.getElementById("add_dropdown").value;
    console.log(e);
    const url = new URL("http://localhost:8000/classes/add_student")
    const data = { "class_id": class_id, "student_id": e };
    axios.post(url, data)
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    updateClassInfo();
    updateClassInfo();
    updateClassInfo();
    document.getElementById("add-student-div").classList.add("invisible_cust");
    document.getElementById("editStudents").classList.remove("invisible_cust");
  }

  return (
    <div className="padding-left">
      <div className="row row-cust class-header">
        <div className="col-7">
          <h1 className="text-left">{grade} Grade Class</h1>
          <h4 className="text-left">{teacher}</h4>
        </div>
        <div className="col-5 text-right">
          <div className="teacher-name">
          <div id="add-student-div" className="invisible_cust form-group form-inline">
            <select className="form-select form-control" id="add_dropdown">
              {newStudents}
            </select>
            <button id="updateStudents" className="inline btn-custom" onClick={() => updateStudent()}>
              <AddIcon/>
            </button>
            <button id="cancelStudents" className="inline btn-custom" onClick={() => cancelEdit()}>
              <CloseIcon/>
            </button>
          </div>
          <button id="editStudents" className="btn-custom" onClick={() => addStudent()}>
            <AddIcon/> ADD STUDENT
          </button>
        </div>
        </div>
      </div>
      <div className="all-students">
      <div className="row student-section">
        <div className="col-4 text-left"><h5>Student Name</h5></div>
        <div className="col-4 text-left"><h5>Student Grade</h5></div>
        <div className="col-4"></div>
      </div>
      {students}
      </div>
    </div>
  );
}

export default ClassPage;
