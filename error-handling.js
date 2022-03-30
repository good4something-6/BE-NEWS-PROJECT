exports.htmlErrorCodes = (err, req, res, next) => {
  switch (err) {
    case "Invalid Item":
      res.status(404).send({ msg: "404 - Invalid Item" });
      break;
  }

  next(err);
};

exports.sqlErrorCodes = (err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      res.status(400).send({ msg: "400 - Invalid Request" });
      break;
  }

  next(err);
};
