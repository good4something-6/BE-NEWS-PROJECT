const {
  getTopics,
  getArticleById,
  patchArticleId,
} = require("./controllers/topics.controllers");

const { htmlErrorCodes } = require("./error-handling");

const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleId);

app.all("/*", (req, res, next) => {
  let err = new Error("Invalid end point");
  next(err);
});

app.use(htmlErrorCodes);

app.use((err, req, res, next) => {
  console.log("DEFAULT ERROR", err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = { app };
