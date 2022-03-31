const {
  pullArticleById,
  updateArticleId,
  pullArticlesWithCommentCount,
  pullArticleComments,
  pushArticleComments,
} = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  pullArticleById(article_id)
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

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  pullArticleComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesWithCommentCount = (req, res, next) => {
  pullArticlesWithCommentCount()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

  pushArticleComments(article_id, username, body)
    .then((restaurant) => {
      res.status(200).send({ restaurant });
    })
    .catch((err) => {
      next(err);
    });
};
