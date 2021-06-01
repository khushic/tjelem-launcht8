const express = require('express')
const app = express();
const port = 8000;
const cors = require('cors')
const db = require('./firebase')
const axios = require('axios');

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get("/class", async(req, res) => {
  var teacher_id = req.query.teacher_id;
  console.log(teacher_id);
  db.collection("classes").where("teacher", "==", teacher_id).get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        res.send(doc.data());
    });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
