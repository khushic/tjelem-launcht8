import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SchoolDirTeacher from "./SchoolDirTeacher";
import SchoolDirStudent from "./SchoolDirStudent";

export default function SchoolDirClass() {
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/class/directory")
      .then((res) => res.json())
      .then((res) => {
        setClasses(res);
      });
  }, []);

  return (
    <div>
      {classes ? (
        classes.map((c) => (
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: "red" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography style={{ flexBasis: "20%" }}>
                Grade: {c.grade_resource}
              </Typography>
              <Button
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  console.log("hello world");
                }}
                style={{ marginLeft: "auto", marginRight: "0" }}
              >
                Modify
              </Button>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "grey" }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <SchoolDirTeacher teacherId={c.teacher_id} />
                </AccordionSummary>
                <AccordionDetails>
                  <SchoolDirStudent studentList={c.students} />
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
