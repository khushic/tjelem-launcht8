const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const db = require("./firebase");
const axios = require("axios");

app.use(express.json());
app.use(cors());

app.get("/class/directory", async (req, res) => {
  const snapshot = await db.collection("classes").get();

  let classList = [];

  snapshot.forEach((doc) => {
    classList.push({ ...doc.data(), id: doc.id });
  });

  res.send(classList);
  // res.sendStatus(200);
});

app.post("/class/add", async (req, res) => {
  const { grade_resource, students, teacher_id } = req.body;

  const resp = await db.collection("classes").add({
    grade_resource,
    students,
    teacher_id,
  });

  console.log("Added class with ID: ", resp.id);
  res.sendStatus(200);
});

app.delete("/class/delete", async (req, res) => {
  const { id } = req.body;
  console.log(db.collection("classes").doc(id));

  const resp = await db.collection("classes").doc(id).delete();
  console.log(`Deleted element with id: ${id}`);
  res.sendStatus(200);
});

app.get("/student/directory", async (req, res) => {
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
