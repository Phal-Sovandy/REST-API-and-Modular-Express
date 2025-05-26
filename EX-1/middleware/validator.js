const validator = (req, res, next) => {
  const body = req.body;
  if (body["name"] && body["email"]) {
    next();
  } else {
    return res.status(401).send("You are not authorized to enter this page!");
  }
};
