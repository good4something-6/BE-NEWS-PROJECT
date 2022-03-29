const db = require("../db/connection.js");

exports.pullTopics = () =>{
    console.log("model");
    return db.query(
        `SELECT * FROM topics` // ORDER BY slug`
    )
    .then((result)=>{
//        console.table(result.rows);
        return result.rows;
    });
};

