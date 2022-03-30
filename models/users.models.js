const db = require("../db/connection.js");

exports.pullAllUsers = () => {
  return db.query("SELECT username FROM users").then((result) => {
    return result.rows;
  });
};
