import React, { useState, Fragment } from "react";
import "./Directory.css";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

moment().format();

const StudentDirectory = ({ students, setStudents }) => {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  function createData(
    schoolID,
    firstName,
    lastName,
    grade,
    gender,
    birthday,
    address,
    parentNames,
    id
  ) {
    return {
      schoolID,
      firstName,
      lastName,
      grade,
      gender,
      birthday,
      address,
      parentNames,
      id,
    };
  }

  const rows = students.map((student) =>
    createData(
      student.student_id,
      student.first_name,
      student.last_name,
      student.grade,
      student.gender,
      student.birthday,
      student.address,
      student.parent_names,
      student.id
    )
  );

  /******* Modal Code ********/

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
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /******** End Modal Code *******/

  const handleDelete = (id) => {
    // e.preventDefault();
    // console.log(bookInfo.title, ", ", bookInfo.authors[0]);

    // console.log(id);
    let json = {
      id: id,
    };
    let url = new URL("http://localhost:8000/student/directory/delete");
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((resp) => resp.json())
      .then((resp) => setStudents(resp));
  };

  //   const handleAdd = () => {};

  const handleAdd = (e) => {
    // e.preventDefault();
    let data = {
      student_id: document.getElementById("addID").value,
      last_name: document.getElementById("addLastName").value,
      first_name: document.getElementById("addFirstName").value,
      grade: parseInt(document.getElementById("addGrade").value),
      gender: document.getElementById("addGender").value,
      birthday: new Date(document.getElementById("addBirthday").value),
      parent_names: [document.getElementById("addParents").value],
      address: document.getElementById("addAddress").value,
      class_grade: -1,
    };
    let url = new URL("http://localhost:8000/student/directory/add");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => setStudents(resp));
    handleClose();
  };

  function EditModal({ row }) {
    const [edit, setEdit] = useState(false);
    const handleEditOpen = () => {
      setEdit(true);
    };
    const handleEditClose = () => {
      setEdit(false);
    };

    const [editedID, setEditedID] = useState(row.schoolID);
    const [editedLastName, setEditedLastName] = useState(row.lastName);
    const [editedFirstName, setEditedFirstName] = useState(row.firstName);
    const [editedGrade, setEditedGrade] = useState(row.grade);
    const [editedGender, setEditedGender] = useState(row.gender);
    const [editedBirthday, setEditedBirthday] = useState(row.birthday);
    const [editedAddress, setEditedAddress] = useState(row.address);
    const [editedParents, setEditedParents] = useState(row.parentNames);

    // console.log(row);
    // console.log(typeof editedBirthday);
    // console.log(editedParents);
    // console.log(moment().format(editedBirthday, "yyyy-MM-dd"));

    const handleEdit = (e, id) => {
      e.preventDefault();
      // let data = {
      //   student_id: document.getElementById("editID").value,
      //   last_name: document.getElementById("editLastName").value,
      //   first_name: document.getElementById("editFirstName").value,
      //   grade: parseInt(document.getElementById("editGrade").value),
      //   gender: document.getElementById("editGender").value,
      //   birthday: new Date(document.getElementById("editBirthday").value),
      //   parent_names: [document.getElementById("editParents").value],
      //   address: document.getElementById("editAddress").value,
      //   class_grade: -1,
      //   id: id,
      // };
      let data = {
        student_id: editedID,
        last_name: editedLastName,
        first_name: editedFirstName,
        grade: editedGrade,
        gender: editedGender,
        birthday: editedBirthday,
        parent_names: editedParents,
        address: editedAddress,
        class_grade: -1,
        id: id,
      };

      // console.log(data);
      let url = new URL("http://localhost:8000/student/directory/edit");

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => setStudents(resp));
      handleClose();
    };

    return (
      <div>
        <Button id={row.id} onClick={handleEditOpen}>
          <EditIcon />
        </Button>
        <Modal
          open={edit}
          onClose={handleEditClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit this Student</h2>
            <form
              id="simple-modal-description"
              className="student-add-form"
              onSubmit={(e) => handleEdit(e, row.id)}
            >
              {/* {console.log(row.id)} */}
              <p>Student ID</p>
              <TextField
                required
                id="editID"
                value={editedID}
                onChange={(e) => setEditedID(e.target.value)}
              />
              <p>Last Name</p>
              <TextField
                required
                id="editLastName"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
              <p>First Name</p>
              <TextField
                required
                id="editFirstName"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
              <p>Grade</p>
              <TextField
                required
                id="editGrade"
                value={parseInt(editedGrade)}
                onChange={(e) => setEditedGrade(e.target.value)}
              />
              <p>Gender</p>
              <TextField
                required
                id="editGender"
                value={editedGender}
                onChange={(e) => setEditedGender(e.target.value)}
              />
              <p>Birthday</p>
              <TextField
                type="date"
                id="editBirthday"
                required
                //   placeholder="MM/DD/YYYY"
                value={editedBirthday}
                onChange={(e) => setEditedBirthday(e.target.value)}
              />
              {/* {console.log(new Date(editedBirthday))} */}
              <p>Address</p>
              <TextField
                required
                id="editAddress"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
              />
              <p>Parent/Guardian(s) (separate with comma)</p>
              <TextField
                required
                id="editParents"
                value={editedParents}
                onChange={(e) => setEditedParents(e.target.value)}
              />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Edit Student
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }

  function Row({ row }) {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
      <Fragment>
        <TableRow className={classes.root}>
          <TableCell>{row.schoolID ? row.schoolID : ""}</TableCell>
          <TableCell align="right">
            {row.lastName ? row.lastName : ""}
          </TableCell>
          <TableCell align="right">
            {row.firstName ? row.firstName : ""}
          </TableCell>
          <TableCell align="right">{row.grade ? row.grade : ""}</TableCell>
          <TableCell align="right">{row.gender ? row.gender : ""}</TableCell>
          <TableCell align="right">
            {moment(row.birthday).format("DD/MM/YY")
              ? moment(row.birthday).format("DD/MM/YY")
              : ""}
          </TableCell>

          <TableCell align="right">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <div className="directory-dropdown">
                  <Typography variant="h6" gutterBottom component="div">
                    Additional Information
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <EditModal row={row} />
                    <Button onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>Parent/Guardian(s)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.address ? row.address : ""}
                      </TableCell>
                      <TableCell>
                        {row.parentNames ? row.parentNames.toString() : ""}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  if (!students) return <h1>Loading</h1>;

  return (
    <div className="container">
      <div className="header">
        <h1>Student Directory</h1>
        <div>
          <Button onClick={handleOpen}>
            <AddIcon /> Add Student
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">Add a Student</h2>

              <form
                id="simple-modal-description"
                className="student-add-form"
                onSubmit={handleAdd}
              >
                <p>Student ID</p>
                <TextField id="addID" required />
                <p>Last Name</p>
                <TextField id="addLastName" required />
                <p>First Name</p>
                <TextField id="addFirstName" required />
                <p>Grade</p>
                <TextField id="addGrade" required />
                <p>Gender</p>
                <TextField id="addGender" required />
                <p>Birthday</p>
                <TextField type="date" id="addBirthday" required />
                <p>Address</p>
                <TextField id="addAddress" required />
                <p>Parent/Guardian(s) (separate with comma)</p>
                <TextField id="addParents" required />
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Create Student
                </Button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>School ID</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Birthday</TableCell>

              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, key) => (
              <Row key={key} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentDirectory;
