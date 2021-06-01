import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function OverallClassView() {
  return (
    <div>
      <h1>Overall Class View</h1>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Kindergarten</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Class 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Teacher, Students</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Class 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Teacher, Students</Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
