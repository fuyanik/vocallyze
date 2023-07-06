
const express = require("express");
const app = express();
const keys = require("./config/keys");
const cors = require('cors');
const axios = require('axios');



app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});



app.listen(8080, () => console.log("Node server listening on port 4242!"));