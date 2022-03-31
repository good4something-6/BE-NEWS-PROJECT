const { pullAllUsers } = require("../models/users.models");

exports.getAllUsers = (req, res, next) => {
  pullAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
