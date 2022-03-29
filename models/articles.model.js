const db = require("../db/connection.js");

exports.pullArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      //        console.log("RESULT ROWS",result.rows[0].created_at.getTimezoneOffset());
      //        console.log("RESULT ROWS2",(new Date(Date.now())).getTimezoneOffset());
      if (!result.rows.length) {
        return Promise.reject("Invalid Item");
      } else {
        return result.rows[0];
      }
    });
};

exports.updateArticleId = (article_id, body) => {
  console.log("model1", article_id, body.inc_votes);
  return db
    .query(
      `UPDATE articles
        SET
        votes= votes + $2
        WHERE article_id = $1
        RETURNING *;`,
      [article_id, body.inc_votes]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject("Invalid article ID");
      } else {
        return result.rows[0];
      }
    });
};
