import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function OverallClassView() {
  const [classes, setClasses] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/class/directory")
      .then((res) => res.json())
      .then((res) => {
        setClasses(res);
      });
    fetch("http://localhost:8000/teacher/directory")
      .then((res) => res.json())
      .then((res) => {
        setTeachers(res);
      });
    fetch("http://localhost:8000/student/directory")
      .then((res) => res.json())
      .then((res) => {
        setStudents(res);
      });
  }, []);

  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <h1>Overall Class View</h1>
      {classes && teachers && students ? (
        classes.map((c) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Grade: {c.grade}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ flexBasis: "33.33%" }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      Teacher:{" "}
                      {teachers.find((t) => t.id === c.teacher_id)[
                        "first name"
                      ] +
                        " " +
                        teachers.find((t) => t.id === c.teacher_id)[
                          "last name"
                        ]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {c.students.map((student) => (
                      <div>
                        <Typography
                          style={{ marginLeft: "5px", marginRight: "5px" }}
                        >
                          Student:{" "}
                          {students.find((s) => s.id === student) !== undefined
                            ? students.find((s) => s.id === student)[
                                "first_name"
                              ] +
                              " " +
                              students.find((s) => s.id === student)[
                                "last_name"
                              ]
                            : student}
                        </Typography>
                        <br></br>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
/*

*/
