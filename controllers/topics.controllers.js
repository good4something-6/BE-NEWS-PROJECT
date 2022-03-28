const { pullTopics } = require("../models/topics.models");

exports.getTopics = () => {
  pullTopics();
};
