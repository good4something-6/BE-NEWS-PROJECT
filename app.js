const { getTopics, invalidEndPoint } = require("./controllers/topics.controllers");

const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/*", invalidEndPoint);

app.use((err, req, res, next) => {
  //console.log("ERROR",err);
  res.status(404).send({ msg: "404 - path not found" });
});

app.use((err, req, res, next) => {
  console.log("DEFAULT ERROR", err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = { app };
