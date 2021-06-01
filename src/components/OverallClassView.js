import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  column: {
    flexBasis: "33.33%",
  },
}));

export default function OverallClassView() {
  const classes = useStyles();
  return (
    <div>
      <h1>Overall Class View</h1>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Kindergarten</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.column}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Class 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Teacher, Students</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classes.column}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Class 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Teacher, Students</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classes.column}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Class 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Teacher, Students</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classes.column}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Class 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Teacher, Students</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
