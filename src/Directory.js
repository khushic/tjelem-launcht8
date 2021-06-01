import React, { useState, Fragment } from "react";
import "./Directory.css";
// import PropTypes from "prop-types";
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
import moment from "moment";

moment().format();

const Directory = ({ students }) => {
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

  const handleDelete = (id) => {
    // e.preventDefault();
    // console.log(bookInfo.title, ", ", bookInfo.authors[0]);

    console.log(id);
    let json = {
      id: id,
    };
    let url = new URL("http://localhost:8000/student/delete");
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    }).then((resp) => resp.json());
  };

  function Row({ row }) {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
      <Fragment>
        <TableRow className={classes.root}>
          <TableCell>{row.schoolID}</TableCell>
          <TableCell align="right">{row.lastName}</TableCell>
          <TableCell align="right">{row.firstName}</TableCell>
          <TableCell align="right">{row.grade}</TableCell>
          <TableCell align="right">{row.gender}</TableCell>
          <TableCell align="right">
            {moment(row.birthday).format("DD/MM/YY")}
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
                  <div style={{ display: "flex" }}>
                    <Button>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                    {/* <form onSubmit={console.log(row.id)}>
                      <Button type="submit" variant="outlined">
                        <DeleteIcon />
                      </Button>
                    </form> */}
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
                        {row.address}
                      </TableCell>
                      <TableCell>{row.parentNames.toString()}</TableCell>
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
      <div>
        <h1>Student Directory</h1>
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
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Directory;
