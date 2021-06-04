import React, { useState, useEffect } from "react";
import { FaRegSmile } from 'react-icons/fa';
import { FaRegSadTear } from 'react-icons/fa';
import { FaRegMeh } from 'react-icons/fa';
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
      if(obj.class_grade == -1){
        setGrade("N/A");
      }
      else if(obj.class_grade == 0){
        setGrade(<FaRegSadTear />);
      }
      else if(obj.class_grade == 1){
        setGrade(<FaRegMeh />);
      }
      else{
        setGrade(<FaRegSmile />);
      }
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
    if(e == -1){
      setGrade("N/A");
    }
    else if(e == 0){
      setGrade(<FaRegSadTear />);
    }
    else if(e == 1){
      setGrade(<FaRegMeh />);
    }
    else{
      setGrade(<FaRegSmile />);
    }    document.getElementById(props.student_id+"updateButton").classList.add("invisible");
    document.getElementById(props.student_id+"editButton").classList.remove("invisible");
  }

  return (
    <div className="row indiv-student">
      <div className="col-3 text-left"><h5>{last}, {first}</h5></div>
      <div className="col-1 text-left"><h4 className="grades">{grade}</h4></div>
      <div className="col-5 text-right">
        <div id={props.student_id+"updateButton"} className="invisible_cust">
          <select className="form-control form-select" id={props.student_id+"dropdown"}>
            <option value="-1" selected="selected">N/A</option>
            <option value="0">Poorly</option>
            <option value="1">Okay</option>
            <option value="2">Good</option>
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
      </div>
      <div className="col-3">
        <button className="btn-custom" onClick={() => removeStudent()}>
          Remove from Class
        </button>
      </div>
    </div>
  );
}
export default StudentGrades;
