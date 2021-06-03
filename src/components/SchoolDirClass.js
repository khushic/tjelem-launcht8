import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Grade: {c.grade_resource}</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
