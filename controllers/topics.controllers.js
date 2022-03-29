const { pullTopics } = require("../models/topics.models");

exports.invalidEndPoint = (req,res,next) => {
  let err = new Error("Invalid end point");
  next(err);
}

exports.getTopics = (req,res,next) => {
  console.log("controller start");
  pullTopics()
  .then((result)=>{
    console.log("controller then");
    res.status(200).send(result);
  })
  .catch((err)=>{
    console.log("err controller", err);
    next(err);
  });
};
