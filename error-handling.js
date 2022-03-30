exports.htmlErrorCodes = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.sqlErrorCodes = (err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      res.status(400).send({ msg: "400 - Invalid Request" });
      break;
    case "23502":
      res.status(400).send({ msg: "400 - Invalid Request" });
      break;
    default:
      next(err);
  }
};
