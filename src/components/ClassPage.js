import React, { useEffect, useState, useContext } from "react";

function ClassPage(props){
  const [students, setStudents] = useState([]);

  var student_list = [];
  const updateClassInfo = () => {
    const url = new URL("http://localhost:5000/classes/get_class?class_id=U2L8HoOduUTS7yyENHO8")
    fetch(url)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      console.log(obj);
    });
  }

  useEffect(() => {
    updateClassInfo();
  }, []);

  return (
    <div>
      <h1>Class</h1>
      <div className="row row-cust">
      </div>
    </div>
  );
}

export default ClassPage;
