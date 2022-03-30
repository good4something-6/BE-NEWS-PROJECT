const { pullAllUsers } = require("../models/users.models");

exports.getAllUsers = (req, res, next) => {
  pullAllUsers()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};
