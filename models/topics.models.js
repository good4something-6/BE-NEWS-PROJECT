const db = require("../db/connection.js");

exports.pullTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    if (!result.rows.length) {
      return Promise.reject("Invalid article ID");
    } else {
      return result.rows;
    }
    });
};
