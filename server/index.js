const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const db = require("./firebase");
const axios = require("axios");

db.settings({ignoreUndefinedProperties: true})
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

app.get('/events/get', async (req, res)=> {
  const snapshot= await db.collection("events").get();
  const events = [];

  snapshot.forEach((doc)=> {
      events.push({...doc.data(), id: doc.id})
  })
  res.send(events);
})

app.post("/events/add", async (req, res)=>{
  const {title , description, location, start, time, displaydate} = req.body;
  console.log(description)
  const resp = await db.collection("events").add({
      title,
      description,
      location,
      start,
      time,
      displaydate
  });
  console.log("added document with id: ", resp.id)
})
app.put("/events/edit", async (req, res)=>{
  const {title , description, location, start, id, time, displaydate} = req.body;
  console.log("edited",id)
  console.log(start)
  const change = db.collection('events').doc(id);
  const resp = await change.update({
    title,
    description,
    location,
    time,
    displaydate,
    start});
})

app.delete("/events/delete", async (req, res)=>{
  const id = req.query.id;
  console.log(id)
  console.log("deleted document with id: ", id)
  const resp = await db.collection("events").doc(id).delete();
  
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
