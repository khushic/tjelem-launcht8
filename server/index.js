const express = require('express')
const app = express();
const port = 8000;
const cors = require('cors')
const db = require('./firebase')
var admin = require('firebase-admin');
const axios = require('axios');
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get("/classes/get_class", async(req, res) => {
  var class_id = req.query.class_id;
  console.log(class_id);
  var classes = db.collection("classes").doc(class_id);

  /*db.collection("classes").where("teacher", "==", teacher_id).get()
  .then((querySnapshot) => {
    res.send(querySnapshot[1]);
    querySnapshot.forEach((doc) => {
      res.sendStatus(200);
        //res.send({id: doc.id(), data: doc.data()});
    });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });*/
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
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
