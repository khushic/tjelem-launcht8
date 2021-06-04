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
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";

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

  // const [dialogOpen, setDialogOpen] = useState(false);
  // const handleDialogOpen = () => {
  //   setDialogOpen(true);
  // };
  // const handleDialogClosed = () => {
  //   setDialogOpen(false);
  // };

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

  const [addID, setAddID] = useState("");
  const [addLastName, setAddLastName] = useState("");
  const [addFirstName, setAddFirstName] = useState("");
  const [addGrade, setAddGrade] = useState("");
  const [addGender, setAddGender] = useState("");
  const [addBirthday, setAddBirthday] = useState("");
  const [addParents, setAddParents] = useState("");
  const [addAddress, setAddAddress] = useState("");

  // const ExistensialDialog = () => {
  //   return (
  //     <Dialog
  //       open={dialogOpen}
  //       onClose={handleDialogClosed}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //     >
  //       <DialogTitle id="alert-dialog-title">
  //         {"Use Google's location service?"}
  //       </DialogTitle>
  //       <DialogContent>
  //         <DialogContentText id="alert-dialog-description">
  //           Let Google help apps determine location. This means sending
  //           anonymous location data to Google, even when no apps are running.
  //         </DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleDialogClosed} color="primary">
  //           Disagree
  //         </Button>
  //         <Button onClick={handleDialogClosed} color="primary" autoFocus>
  //           Agree
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   );
  // };

  const handleAdd = (e) => {
    e.preventDefault();

    let data = {
      student_id: addID,
      last_name: addLastName,
      first_name: addFirstName,
      grade: parseInt(addGrade),
      gender: addGender,
      birthday: addBirthday,
      parent_names: addParents,
      address: addAddress,
      class_grade: -1,
    };

    let IDs = [];

    students.forEach((student) => IDs.push(student.student_id));

    if (!IDs.includes(addID)) {
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
    } else {
      // handleDialogOpen();
      // <ExistensialDialog />;
      alert("This ID already exists.");
    }
    handleClose();
    setAddID("");
    setAddLastName("");
    setAddFirstName("");
    setAddGrade("");
    setAddGender("");
    setAddBirthday("");
    setAddParents("");
    setAddAddress("");
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
        <Button id={row.id} onClick={handleEditOpen} className="blue-font">
          <EditIcon />
        </Button>
        <Modal
          open={edit}
          onClose={handleEditClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <br />
            <h2 id="simple-modal-title" className="poppins">
              Edit this Student
            </h2>
            <form
              id="simple-modal-description"
              className="student-add-form"
              onSubmit={(e) => handleEdit(e, row.id)}
            >
              {/* {console.log(row.id)} */}
              <p className="roboto">Student ID</p>
              <TextField
                required
                id="editID"
                value={editedID}
                onChange={(e) => setEditedID(e.target.value)}
              />
              <p className="roboto">Last Name</p>
              <TextField
                required
                id="editLastName"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
              <p className="roboto">First Name</p>
              <TextField
                required
                id="editFirstName"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
              <p className="roboto">Grade</p>
              <TextField
                required
                id="editGrade"
                value={parseInt(editedGrade)}
                onChange={(e) => setEditedGrade(e.target.value)}
              />
              <p className="roboto">Gender</p>
              <TextField
                required
                id="editGender"
                value={editedGender}
                onChange={(e) => setEditedGender(e.target.value)}
              />
              <p className="roboto">Birthday</p>
              <TextField
                type="date"
                id="editBirthday"
                required
                //   placeholder="MM/DD/YYYY"
                value={editedBirthday}
                onChange={(e) => setEditedBirthday(e.target.value)}
              />
              {/* {console.log(new Date(editedBirthday))} */}
              <p className="roboto">Address</p>
              <TextField
                required
                id="editAddress"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
              />
              <p className="roboto">Parent/Guardian(s) (separate with comma)</p>
              <TextField
                required
                id="editParents"
                value={editedParents}
                onChange={(e) => setEditedParents(e.target.value)}
              />
              <br />
              <Button type="submit" variant="contained" color="primary" className="blue-font">
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
          <TableCell className="roboto">
            {row.schoolID ? row.schoolID : ""}
          </TableCell>
          <TableCell className="roboto" align="right">
            {row.lastName ? row.lastName : ""}
          </TableCell>
          <TableCell className="roboto" align="right">
            {row.firstName ? row.firstName : ""}
          </TableCell>
          <TableCell className="roboto" align="right">
            {row.grade ? row.grade : ""}
          </TableCell>
          <TableCell className="roboto" align="right">
            {row.gender ? row.gender : ""}
          </TableCell>
          <TableCell className="roboto" align="right">
            {moment(row.birthday).format("MM/DD/YY")
              ? moment(row.birthday).format("MM/DD/YY")
              : ""}
          </TableCell>

          <TableCell className="roboto" align="right">
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
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="poppins"
                  >
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
                      <TableCell className="poppins">Address</TableCell>
                      <TableCell className="poppins">
                        Parent/Guardian(s)
                      </TableCell>
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
    <div className="padding-directory">
      <div
        className="header"
        style={{
          paddingBottom: "2rem",
          paddingTop: "2rem",
        }}
      >
        <h1></h1>
        <div>
          <button className="btn-custom blue-font roboto" onClick={handleOpen} >
            <AddIcon /> ADD STUDENT
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <br />
              <h2 id="simple-modal-title" className="poppins">
                Add a Student
              </h2>

              <form
                id="simple-modal-description"
                className="student-add-form"
                onSubmit={handleAdd}
              >
                <p className="roboto">Student ID</p>
                <TextField
                  value={addID}
                  onChange={(e) => setAddID(e.target.value)}
                  required
                />
                <p className="roboto">Last Name</p>
                <TextField
                  value={addLastName}
                  onChange={(e) => setAddLastName(e.target.value)}
                  required
                />
                <p className="roboto">First Name</p>
                <TextField
                  value={addFirstName}
                  onChange={(e) => setAddFirstName(e.target.value)}
                  required
                />
                <p className="roboto">Grade</p>
                <TextField
                  value={addGrade}
                  onChange={(e) => setAddGrade(e.target.value)}
                  required
                />
                <p className="roboto">Gender</p>
                <TextField
                  value={addGender}
                  onChange={(e) => setAddGender(e.target.value)}
                  required
                />
                <p className="roboto">Birthday</p>
                <TextField
                  type="date"
                  value={addBirthday}
                  onChange={(e) => setAddBirthday(e.target.value)}
                  required
                />
                <p className="roboto">Address</p>
                <TextField
                  value={addAddress}
                  onChange={(e) => setAddAddress(e.target.value)}
                  required
                />
                <p className="roboto">
                  Parent/Guardian(s) (separate with comma)
                </p>
                <TextField
                  value={addParents}
                  onChange={(e) => setAddParents(e.target.value)}
                  required
                />
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
              <TableCell className="poppins">School ID</TableCell>
              <TableCell className="poppins" align="right">
                Last Name
              </TableCell>
              <TableCell className="poppins" align="right">
                First Name
              </TableCell>
              <TableCell className="poppins" align="right">
                Grade
              </TableCell>
              <TableCell className="poppins" align="right">
                Gender
              </TableCell>
              <TableCell className="poppins" align="right">
                Birthday
              </TableCell>

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
