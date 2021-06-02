const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const db = require('./firebase');
var admin = require('firebase-admin');
const axios = require('axios');
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get("/classes/get_class", async(req, res) => {
  var class_id = req.query.class_id;
  console.log(class_id);
  var classes = db.collection("classes").doc(class_id);
  classes.get().then((doc) => {
    if (doc.exists) {
        res.send(doc.data());
    } else {
        res.sendStatus(404);
    }
  }).catch((error) => {
    res.sendStatus(404);
  });
});

app.get("/classes/student_grade", async(req, res) => {
  var student_id = req.query.student_id;
  var student = db.collection("students").doc(student_id);
  student.get().then((doc) => {
    if (doc.exists) {
        res.send({
          "first_name": doc.data().first_name,
          "last_name": doc.data().last_name,
          "class_grade": doc.data().class_grade
        });
    } else {
        res.sendStatus(404);
    }
  }).catch((error) => {
    res.sendStatus(404);
  });
});

app.post("/classes/add_student", async(req, res) => {
  console.log(req.body);
  const {class_id, student_id} = req.body;
  var classes = db.collection("classes").doc(class_id);

  var arrUnion = classes.update({
    students: admin.firestore.FieldValue.arrayUnion(student_id)
  });
  res.sendStatus(200);
});

app.delete("/classes/remove_student", async(req, res) =>{
  console.log(req.body);
  const {class_id, student_id} = req.body;
  var classes = db.collection("classes").doc(class_id);

  var arrUnion = classes.update({
    students: admin.firestore.FieldValue.arrayRemove(student_id)
  });
  res.sendStatus(200);
});

app.put("/classes/update_grades", async(req, res) => {
  const {student_id, new_grade} = req.body;
  var students = db.collection("students").doc(student_id);

  students.update({
    class_grade: new_grade
  })
  .then(() => {
      console.log("Document successfully updated!");
      res.sendStatus(200);
  })
  .catch((error) => {
      console.error("Error updating document: ", error);
  });
});

app.put("/classes/update_teacher", async(req, res) => {
  const {class_id, new_teacher} = req.body;
  var classes = db.collection("classes").doc(class_id);

  classes.update({
    teacher_id: new_teacher
  })
  .then(() => {
      console.log("Document successfully updated!");
      res.sendStatus(200);
  })
  .catch((error) => {
      console.error("Error updating document: ", error);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
