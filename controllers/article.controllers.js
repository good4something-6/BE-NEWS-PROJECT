const {
  pullArticleById,
  updateArticleId,
  pullArticlesWithCommentCount,
  pullArticleComments,
} = require("../models/articles.model");

const { convertTimestampToDate } = require("../db/helpers/utils.js");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  pullArticleById(article_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  updateArticleId(article_id, body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesWithCommentCount = (req, res, next) => {
  console.log("HERE");
  // sort_by, sorts the articles by any valid column (defaults to date)
  // order, asc or desc (defaults to descending)
  // topic, filters by the topic value specified in the query
  const { sort_by } = req.query;
  console.log(sort_by);

  pullArticlesWithCommentCount(sort_by)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  pullArticleComments(article_id)
    .then((results) => {
      res.send(200).send(results);
    })
    .catch(next);
};
