import React, { useState, useEffect } from "react";
import axios from 'axios';

function StudentGrades(props){
  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);
  const [grade, setGrade] = useState([]);

  const removeStudent = () => {
    const url = new URL("http://localhost:8000/classes/remove_student")
    const data_body = { "class_id": props.class_id, "student_id": props.student_id };
    axios.delete(url, {data: data_body})
    .then((resp) => {
      return resp;
    })
    .then((temp) => {
      props.update();
      props.update();
      props.update();
    });
  };

  const updateStudentInfo = () => {
    const url = new URL("http://localhost:8000/classes/student_grade");
    url.searchParams.append("student_id", props.student_id);
    fetch(url)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      setFirst(obj.first_name);
      setLast(obj.last_name);
      setGrade(obj.class_grade);
    });
  }

  useEffect(() => {
    updateStudentInfo();
    document.getElementById(props.student_id+"updateButton").classList.add("invisible");
  }, []);

  const editGrade = () => {
    document.getElementById(props.student_id+"updateButton").classList.remove("invisible");
    document.getElementById(props.student_id+"editButton").classList.add("invisible");
  }

  const cancelEdit = () => {
    document.getElementById(props.student_id+"updateButton").classList.add("invisible");
    document.getElementById(props.student_id+"editButton").classList.remove("invisible");
  }

  const updateGrade = () => {
    var e = document.getElementById(props.student_id+"dropdown").value;
    const url = new URL("http://localhost:8000/classes/update_grades")
    const data = { "student_id": props.student_id, "new_grade": e };
    axios.put(url, data)
    .then((resp) => {
      return resp;
    })
    setGrade(e);
    document.getElementById(props.student_id+"updateButton").classList.add("invisible");
    document.getElementById(props.student_id+"editButton").classList.remove("invisible");
  }

  return (
    <div>
        <h5>{last}, {first}</h5>
        <p>{grade}</p>
        <div id={props.student_id+"updateButton"} className="invisible_cust">
          <select id={props.student_id+"dropdown"}>
            <option value="-1" selected="selected">N/A</option>
            <option value="0">sad</option>
            <option value="1">eh</option>
            <option value="2">smiley</option>
          </select>
          <button id={props.student_id+"updateGrade"} className="btn-custom" onClick={() => updateGrade()}>
            Submit Update
          </button>
          <button id={props.student_id+"cancelButton"} className="btn-custom" onClick={() => cancelEdit()}>
            Cancel
          </button>
        </div>
        <button id={props.student_id+"editButton"} className="btn-custom" onClick={() => editGrade()}>
          Edit Grade
        </button>
        <button className="btn-custom" onClick={() => removeStudent()}>
          Remove from Class
        </button>
    </div>
  );
}
export default StudentGrades;