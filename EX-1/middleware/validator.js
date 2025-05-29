const validator = (req, res, next) => {
  const { name = null, email = null } = req.body;

  if (name && email) {
    next();
  } else {
    return res.status(401).send("You are not authorized to enter this page!");
  }
};

export default validator;
