const db = require("../db/connection.js");

exports.pullTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    //        console.table(result.rows);
    return result.rows;
  });
};

