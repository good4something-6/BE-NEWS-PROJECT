exports.htmlErrorCodes  =(err, req, res, next) => {
    //  console.log("ERROR", err);
      switch (err) {
        case "Invalid Item":
          res.status(400).send({ msg: "400 - Invalid Item" });
          break;
      
        default:
          res.status(404).send({ msg: "404 - path not found" });
          break;
      }
    }