const db = require("../db/connection.js");

exports.pullTopics = () =>{
    return db.query(
        `SELECT * FROM topics;`
    )
    .then((result)=>{
//        console.table(result.rows);
        return result.rows;
    });
};

exports.pullArticleById = (article_id)=>{
    return db.query(
        `SELECT * FROM articles WHERE article_id = $1;`,
        [article_id]
    )
    .then((result)=>{
//        console.log("RESULT ROWS",result.rows[0].created_at.getTimezoneOffset());
//        console.log("RESULT ROWS2",(new Date(Date.now())).getTimezoneOffset());
        if(!result.rows.length){
            return Promise.reject("Invalid Item");
        }else{
            return result.rows[0];
        }
    });
};