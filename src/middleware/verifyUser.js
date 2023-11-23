const { db } = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsername = (req, res, next) => {
  if (!req.body.username) return next();
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  let roles = [0, 1, 2];
  if (req.body.role) {
    if (!roles.includes(req.body.role)) {
      res.status(400).send({
        message: `Role '${req.body.role}' does not exist!`,
      });
      return;
    }
  }
  next();
};

const verifyUser = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifyUser;
