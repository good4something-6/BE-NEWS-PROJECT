const {
  sendArticleComments,
  fetchArticleComments,
  removeArticleComment,
} = require("../models/comments.models");

exports.deleteArticleComment = (req, res, next) => {
  const { comment_id } = req.params;

  removeArticleComment(comment_id)
    .then((result) => {
      if (result.rowCount === 1) {
        res.status(204).send();
      } else {
        throw { status: 400, msg: "400 - Invalid Request" };
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

  sendArticleComments(article_id, username, body)
    .then((comment) => {
      res.status(200).send({ commentPosted: comment });
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
