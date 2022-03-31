const db = require("../db/connection.js");

exports.pullArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          msg: "404 - Article Not Found",
        });
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
      console.log("HERE MODEL", result.rows.length);
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "404 - Article Not Found" });
      } else {
        return result.rows[0];
      }
    });
};

exports.pullArticlesWithCommentCount = () => {
  return db
    .query(
      `
      SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      CAST(COUNT( comments.article_id ) AS INT)
      FROM articles LEFT JOIN comments 
      ON comments.article_id = articles.article_id
      GROUP BY 
      articles.article_id
      ORDER BY articles.created_at DESC
      `
    )
    .then((result) => {
      return result.rows;
    });
};

exports.pullArticleComments = (article_id) => {
  return db
    .query(
      `
    SELECT article_id FROM articles WHERE article_id=$1
    `,
      [article_id]
    )
    .then((results) => {
      if (!results.rows.length) {
        return Promise.reject({
          status: 404,
          msg: "404 - Article Not Found",
        });
      } else {
        console.table(results.rows);
        return results.rows;
      }
    });
};
