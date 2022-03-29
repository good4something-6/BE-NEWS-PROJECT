const db = require("../db/connection.js");

exports.pullArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      } else {
        return result.rows[0];
      }
    });
};

exports.updateArticleId = (article_id, body) => {
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
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      } else {
        return result.rows[0];
      }
    });
};
