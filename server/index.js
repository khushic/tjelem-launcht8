const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const db = require("./firebase");
const axios = require("axios");

app.use(express.json());
app.use(cors());

app.get("/student/directory", async (req, res) => {
  const snapshot = await db.collection("students").get();

  let studentList = [];

  snapshot.forEach((doc) => {
    studentList.push({ ...doc.data(), id: doc.id });
  });
  res.send(studentList);
  // res.sendStatus(200);
});

app.delete("/student/directory/delete", async (req, res) => {
  const { id } = req.body;
  // console.log(db.collection("students").doc(id));

  const resp = await db.collection("students").doc(id).delete();
  console.log(`Deleted element with id: ${id}`);

  const snapshot = await db.collection("students").get();

  let studentList = [];

  snapshot.forEach((doc) => {
    studentList.push({ ...doc.data(), id: doc.id });
  });
  res.send(studentList);

  // res.sendStatus(200);
  //add get to to produce response of array for instant update
});

app.post("/student/directory/add", async (req, res) => {
  // console.log(req.body);

  const {
    address,
    birthday,
    class_grade,
    first_name,
    gender,
    grade,
    last_name,
    parent_names,
    student_id,
  } = req.body;

  const resp = await db.collection("students").add({
    address,
    birthday,
    class_grade,
    first_name,
    gender,
    grade,
    last_name,
    parent_names,
    student_id,
  });

  console.log(`Added element with id: ${resp.id}`);

  const snapshot = await db.collection("students").get();

  let studentList = [];

  snapshot.forEach((doc) => {
    studentList.push({ ...doc.data(), id: doc.id });
  });
  res.send(studentList);

  // res.sendStatus(200);
});

app.put("/student/directory/edit", async (req, res) => {
  const {
    address,
    birthday,
    class_grade,
    first_name,
    gender,
    grade,
    last_name,
    parent_names,
    student_id,
    id,
  } = req.body;

  console.log("id: ", req.body.id);

  const resp = await db.collection("students").doc(id).update({
    address,
    birthday,
    class_grade,
    first_name,
    gender,
    grade,
    last_name,
    parent_names,
    student_id,
  });

  console.log(`Edited element with id: ${id}`);

  const snapshot = await db.collection("students").get();

  let studentList = [];

  snapshot.forEach((doc) => {
    studentList.push({ ...doc.data(), id: doc.id });
  });
  res.send(studentList);

  // res.sendStatus(200);
});

app.get("/teacher/directory", async (req, res) => {
  const snapshot = await db.collection("teachers").get();

  let teacherList = [];

  snapshot.forEach((doc) => {
    teacherList.push({ ...doc.data(), id: doc.id });
  });

  res.send(teacherList);
  // res.sendStatus(200);
});

app.delete("/teacher/directory/delete", async (req, res) => {
  const { id } = req.body;
  // console.log(db.collection("students").doc(id));

  const resp = await db.collection("teachers").doc(id).delete();
  console.log(`Deleted element with id: ${id}`);

  const snapshot = await db.collection("teachers").get();

  let teacherList = [];

  snapshot.forEach((doc) => {
    teacherList.push({ ...doc.data(), id: doc.id });
  });
  res.send(teacherList);

  // res.sendStatus(200);
  //add get to to produce response of array for instant update
});

app.post("/teacher/directory/add", async (req, res) => {
  // console.log(req.body);

  const { address, birthday, email, first_name, gender, grade, last_name } =
    req.body;

  const resp = await db.collection("teachers").add({
    address,
    birthday,
    email,
    first_name,
    gender,
    grade,
    last_name,
  });

  console.log(`Added element with id: ${resp.id}`);

  const snapshot = await db.collection("teachers").get();

  let teacherList = [];

  snapshot.forEach((doc) => {
    teacherList.push({ ...doc.data(), id: doc.id });
  });
  res.send(teacherList);

  // res.sendStatus(200);
});

app.put("/teacher/directory/edit", async (req, res) => {
  const { address, birthday, email, first_name, gender, grade, last_name, id } =
    req.body;

  console.log("id: ", req.body.id);

  const resp = await db.collection("teachers").doc(id).update({
    address,
    birthday,
    email,
    first_name,
    gender,
    grade,
    last_name,
  });

  console.log(`Edited element with id: ${id}`);

  const snapshot = await db.collection("teachers").get();

  let teacherList = [];

  snapshot.forEach((doc) => {
    teacherList.push({ ...doc.data(), id: doc.id });
  });
  res.send(teacherList);

  // res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
