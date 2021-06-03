import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function SchoolDirStudent({ studentList }) {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/student/directory")
      .then((res) => res.json())
      .then((res) => {
        setStudents(res);
      });
  }, []);

  return (
    <List>
      {students &&
        studentList.map((student) => (
          <ListItem>
            <ListItemText>
              {students.find((s) => s.id === student) !== undefined
                ? students.find((s) => s.id === student).first_name +
                  " " +
                  students.find((s) => s.id === student).last_name
                : "undefined"}
            </ListItemText>
          </ListItem>
        ))}
    </List>
  );
}
