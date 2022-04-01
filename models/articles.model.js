const db = require("../db/connection.js");

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `
     SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.body,
      articles.created_at, 
      articles.votes, 
      CAST(COUNT( comments.article_id ) AS INT) AS "comment_count"
      FROM articles LEFT JOIN comments 
      ON comments.article_id = articles.article_id
	    WHERE articles.article_id = $1
      GROUP BY 
      articles.article_id

    `,
      [article_id]
    )
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

exports.fetchArticlesWithCommentCount = () => {
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

