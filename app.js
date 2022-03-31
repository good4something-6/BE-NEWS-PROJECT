const { getTopics } = require("./controllers/topics.controllers");

const {
  getArticleById,
  patchArticleId,
  getArticlesWithCommentCount,
  getArticleComments,
  postArticleComments,
} = require("./controllers/article.controllers");

const { getAllUsers } = require("./controllers/users.controllers");

const { htmlErrorCodes, sqlErrorCodes } = require("./error-handling");

const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleId);

app.post("/api/articles/:article_id/comments", postArticleComments);

app.get("/api/users", getAllUsers);

app.get("/api/articles", getArticlesWithCommentCount);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "404 - Invalid end point" });
});

app.use(htmlErrorCodes);

app.use(sqlErrorCodes);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = { app };
