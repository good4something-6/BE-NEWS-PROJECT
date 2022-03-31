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
        return Promise.reject({ status: 404, msg: "404 - Article Not Found" });
      } else {
        return result.rows[0];
      }
    });
};

exports.pullArticleComments = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "404 - Article Not Found" });
      } else {
        return result.rows[0];
      }
    })
    .then((result) => {
      return db
        .query(
          `SELECT comment_id, votes, created_at, author, body
            FROM comments 
            WHERE article_id = $1;`,
          [article_id]
        )
        .then((result) => {
          // if (!result.rows.length) {
          //   return Promise.reject({
          //     status: 204,
          //     msg: "NO MESSAGE IS PASSED FOR 200+ ERRORS (NO BODY)",
          //   });
          // } else {
          return result.rows;
          //}
        });
    });
};
