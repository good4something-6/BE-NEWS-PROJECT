const {
  fetchArticleById,
  updateArticleId,
  fetchArticlesWithCommentCount,
} = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  updateArticleId(article_id, body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesWithCommentCount = (req, res, next) => {
  // sort_by, sorts the articles by any valid column (defaults to date)
  // order, asc or desc (defaults to descending)
  // topic, filters by the topic value specified in the query
  const { sort_by, order, topic } = req.query;
  fetchArticlesWithCommentCount(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  pullArticleComments(article_id).then((results) => {
    res.send(200).send(results);
    fetchArticlesWithCommentCount()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  });
};
