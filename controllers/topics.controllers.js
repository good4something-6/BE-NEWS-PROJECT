const {
  pullTopics,
} = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
  pullTopics()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};


