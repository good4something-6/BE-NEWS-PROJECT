const { pullTopics } = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
  pullTopics()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  pullArticleById(article_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
