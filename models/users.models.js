const db = require("../db/connection.js");

exports.fetchAllUsers = () => {
  return db.query("SELECT username FROM users").then((result) => {
    return result.rows;
  });
};
