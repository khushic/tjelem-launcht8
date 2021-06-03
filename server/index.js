const express = require('express')
const app = express();
const port = 8000;
const cors = require('cors')
const db = require('./firebase')

app.use(express.json());
app.use(cors({origin : true}))

db.settings({ignoreUndefinedProperties: true})

app.get('/', (req, res) => {
  res.send('Hello World!')
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
  console.log(`Example app listening on port ${port}!`)
});
