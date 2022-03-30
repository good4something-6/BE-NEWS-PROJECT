const {
  pullArticleById,
  updateArticleId,
  pullArticlesWithCommentCount,
  pullArticleComments,
} = require("../models/articles.model");

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

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  pullArticleComments(article_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesWithCommentCount = (req, res, next) => {
  pullArticlesWithCommentCount()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch(next);
};
