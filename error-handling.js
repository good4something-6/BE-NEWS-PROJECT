exports.htmlErrorCodes = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.sqlErrorCodes = (err, req, res, next) => {
  checkError = ["22P02", "23502", "23503", "42703", "42601"].includes(err.code);
  switch (checkError) {
    case true:
      res.status(400).send({ msg: "400 - Invalid Request" });
      break;

    default:
      next(err);
  }
};
