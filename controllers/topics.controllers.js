const { pullTopics } = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
  pullTopics()
    .then((topics) => {
      res.status(200).send({topics});
    })
    .catch((err) => {
      next(err);
    });
};
