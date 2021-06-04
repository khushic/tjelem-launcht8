import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Modal,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SchoolDirTeacher from "./SchoolDirTeacher";
import SchoolDirStudent from "./SchoolDirStudent";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

export default function SchoolDirClass() {
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/class/directory")
      .then((res) => res.json())
      .then((res) => {
        setClasses(res);
      });
  }, []);

  const delClass = (id) => {
    const url = new URL("http://localhost:8000/class/delete");
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    document.getElementById(id).remove();
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].id === id) {
        console.log(classes.splice(i, 1));
        break;
      }
    }
  };

  const addClass = () => {
    const url = new URL("http://localhost:8000/class/add");
    const data = { grade_resource: "", students: [], teacher_id: "" };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };

  const editClass = (id) => {
    console.log(id);
  };

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      textAlign: "center",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const styles = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginLeft: "15%", marginRight: "15%" }}>
      <div id="main">
        {classes ? (
          classes.map((c) => (
            <Accordion id={c.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    marginLeft: "5%",
                    textAlign: "left",
                    flexBasis: "20%",
                  }}
                  className="poppins"
                >
                  Grade: {c.grade_resource ? c.grade_resource : "undefined"}
                </Typography>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    event.stopPropagation();
                    editClass(c.id);
                  }}
                  style={{
                    backgroundColor: "#ECD100",
                    color: "white",
                    marginLeft: "62.5%",
                    marginRight: "0",
                  }}
                  href="http://localhost:3000/ClassPage"
                >
                  <CreateIcon />
                </Button>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    event.stopPropagation();
                    delClass(c.id);
                  }}
                  style={{
                    backgroundColor: "#ECD100",
                    color: "white",
                    marginLeft: "auto",
                    marginRight: "0",
                  }}
                >
                  <DeleteIcon/>
                </Button>
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
      {classes ? (
        <div>
          <Button
            style={{
              backgroundColor: "#ECD100",
              color: "white",
              marginTop: "10px",
              marginBottom: "auto",
            }}
            variant="contained"
            onClick={() => {
              handleOpen();
              addClass();
            }}
            className="roboto"
          >
            <AddIcon />Add Class
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="padding-modal"
          >
            <div style={modalStyle} className={styles.paper}>
              <div className="padding-modal">
              <h2 classname="roboto">Empty class created! Press the button below to edit:</h2>
              <br />
              <Button
                variant="contained"
                style={{ backgroundColor: "#ECD100", color: "white" }}
                href="http://localhost:3000/ClassPage"
              >
                Edit
              </Button>
              </div>
            </div>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
