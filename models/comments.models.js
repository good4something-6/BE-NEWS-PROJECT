const db = require("../db/connection.js");

exports.fetchArticleComments = (article_id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body
            FROM comments 
            WHERE article_id = $1;`,
      [article_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.sendArticleComments = (article_id, username, body) => {
  return db
    .query(
      `
    INSERT INTO comments
    (article_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `,
      [article_id, username, body]
    )
    .then((results) => {
      return results.rows[0];
    });
};
