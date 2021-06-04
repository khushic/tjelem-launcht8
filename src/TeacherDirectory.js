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

const TeacherDirectory = ({ teachers, setTeachers }) => {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  function createData(
    email,
    firstName,
    lastName,
    grade,
    gender,
    birthday,
    address,
    resource,
    id
  ) {
    return {
      email,
      firstName,
      lastName,
      grade,
      gender,
      birthday,
      address,
      resource,
      id,
    };
  }

  const rows = teachers.map((teacher) =>
    createData(
      teacher.email,
      teacher.first_name,
      teacher.last_name,
      teacher.grade,
      teacher.gender,
      teacher.birthday,
      teacher.address,
      teacher.resource,
      teacher.id
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
    let url = new URL("http://localhost:8000/teacher/directory/delete");
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((resp) => resp.json())
      .then((resp) => setTeachers(resp));
  };

  //   const handleAdd = () => {};

  const [addEmail, setAddEmail] = useState("");
  const [addLastName, setAddLastName] = useState("");
  const [addFirstName, setAddFirstName] = useState("");
  const [addGrade, setAddGrade] = useState("");
  const [addGender, setAddGender] = useState("");
  const [addBirthday, setAddBirthday] = useState("");
  const [addAddress, setAddAddress] = useState("");
  const [addResource, setAddResource] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    let data = {
      email: addEmail,
      last_name: addLastName,
      first_name: addFirstName,
      grade: parseInt(addGrade),
      gender: addGender,
      birthday: addBirthday,
      address: addAddress,
      resource: addResource,
    };

    let IDs = [];

    teachers.forEach((teacher) => IDs.push(teacher.email));

    if (!IDs.includes(addEmail)) {
      let url = new URL("http://localhost:8000/teacher/directory/add");

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => setTeachers(resp));
    } else {
      alert("This email already exists.");
    }
    handleClose();
    setAddEmail("");
    setAddLastName("");
    setAddFirstName("");
    setAddGrade("");
    setAddGender("");
    setAddBirthday("");
    setAddAddress("");
    setAddResource("");
  };

  function EditModal({ row }) {
    const [edit, setEdit] = useState(false);
    const handleEditOpen = () => {
      setEdit(true);
    };
    const handleEditClose = () => {
      setEdit(false);
    };

    const [editedEmail, setEditedEmail] = useState(row.email);
    const [editedLastName, setEditedLastName] = useState(row.lastName);
    const [editedFirstName, setEditedFirstName] = useState(row.firstName);
    const [editedGrade, setEditedGrade] = useState(row.grade);
    const [editedGender, setEditedGender] = useState(row.gender);
    const [editedBirthday, setEditedBirthday] = useState(row.birthday);
    const [editedAddress, setEditedAddress] = useState(row.address);
    const [editedResource, setEditedResource] = useState(row.resource);

    // console.log(row);
    // console.log(typeof editedBirthday);
    // console.log(editedParents);
    // console.log(moment().format(editedBirthday, "yyyy-MM-dd"));

    const handleEdit = (e, id) => {
      e.preventDefault();
      //   console.log(id);
      let data = {
        email: editedEmail,
        last_name: editedLastName,
        first_name: editedFirstName,
        grade: editedGrade,
        gender: editedGender,
        birthday: editedBirthday,
        address: editedAddress,
        resource: editedResource,
        id: id,
      };

      // console.log(data);
      let url = new URL("http://localhost:8000/teacher/directory/edit");

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => setTeachers(resp));
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
            <h2 id="simple-modal-title">Edit this Teacher</h2>
            <form
              id="simple-modal-description"
              className="student-add-form"
              onSubmit={(e) => handleEdit(e, row.id)}
            >
              {/* {console.log(row.id)} */}
              <p>Email</p>
              <TextField
                required
                id="editEmail"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
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
              <p>Resource</p>
              <TextField
                required
                id="editResource"
                value={editedResource}
                onChange={(e) => setEditedResource(e.target.value)}
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
              <p>Address</p>
              <TextField
                required
                id="editAddress"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
              />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Edit Teacher
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
          <TableCell>{row.email ? row.email : ""}</TableCell>
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
                      <TableCell>Resource</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.address ? row.address : ""}
                      </TableCell>
                      <TableCell>{row.resource ? row.resource : ""}</TableCell>
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

  if (!teachers) return <h1>Loading</h1>;

  return (
    <div className="container">
      <div className="header">
        <h1>Teacher Directory</h1>
        <div>
          <Button onClick={handleOpen}>
            <AddIcon /> Add Teacher
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">Add a Teacher</h2>

              <form
                id="simple-modal-description"
                className="student-add-form"
                onSubmit={handleAdd}
              >
                <p>Email Address</p>
                <TextField
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  required
                />
                <p>Last Name</p>
                <TextField
                  value={addLastName}
                  onChange={(e) => setAddLastName(e.target.value)}
                  required
                />
                <p>First Name</p>
                <TextField
                  value={addFirstName}
                  onChange={(e) => setAddFirstName(e.target.value)}
                  required
                />
                <p>Grade</p>
                <TextField
                  value={addGrade}
                  onChange={(e) => setAddGrade(e.target.value)}
                  required
                />
                <p>Resource</p>
                <TextField
                  value={addResource}
                  onChange={(e) => setAddResource(e.target.value)}
                  required
                />
                <p>Gender</p>
                <TextField
                  value={addGender}
                  onChange={(e) => setAddGender(e.target.value)}
                  required
                />
                <p>Birthday</p>
                <TextField
                  type="date"
                  value={addBirthday}
                  onChange={(e) => setAddBirthday(e.target.value)}
                  required
                />
                <p>Address</p>
                <TextField
                  value={addAddress}
                  onChange={(e) => setAddAddress(e.target.value)}
                  required
                />

                <br />
                <Button type="submit" variant="contained" color="primary">
                  Create Teacher
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
              <TableCell>Email Address</TableCell>
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

export default TeacherDirectory;
