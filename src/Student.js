import React from "react";
import "./Student.css";
import moment from "moment";

moment().format();

const Student = ({ student }) => {
  if (!student) return <h1>loading...</h1>;
  return (
    <div className="student">
      <div className="student-info">
        <h1>Student ID: {student.student_id}</h1>
        <h1>
          Name: {student.first_name} {student.last_name}
        </h1>
        <h1>Gender: {student.gender}</h1>
        <h1>Grade: {student.grade}</h1>
        <h1>D.O.B.: {moment(student.birthday).format("DD/MM/YY")}</h1>
        <h1>Address: {student.address}</h1>
        <h1>Parent Information: {student.parent_names.toString()}</h1>
      </div>
    </div>
  );
};

export default Student;
