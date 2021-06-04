import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function SchoolDirTeacher({ teacherId }) {
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/teacher/directory")
      .then((res) => res.json())
      .then((res) => {
        setTeachers(res);
      });
  }, []);

  return (
    <Typography
      style={{
        //marginLeft: "5%",
        textAlign: "left",
        flexBasis: "33.33%",
        flexShrink: "0",
        //width: "75%",
        //backgroundColor: "red",
      }}
      className="poppins"
    >
      Teacher:
      {teachers && teachers.find((t) => t.id === teacherId) !== undefined
        ? (teachers.find((t) => t.id === teacherId).gender === "Male"
            ? " Mr. "
            : " Mrs. ") +
          teachers.find((t) => t.id === teacherId).first_name +
          " " +
          teachers.find((t) => t.id === teacherId).last_name
        : " undefined"}
    </Typography>
  );
}
