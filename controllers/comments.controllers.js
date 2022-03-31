const {
  sendArticleComments,
  fetchArticleComments,
} = require("../models/comments.models");

exports.postArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

  sendArticleComments(article_id, username, body)
    .then((restaurant) => {
      res.status(200).send({ restaurant });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleComments(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
