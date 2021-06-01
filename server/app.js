const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const db = require("./firebase");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Hello, world");
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
