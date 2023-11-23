const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { db } = require("../models");
const User = db.user;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    res.status(401).send({
      message: "Unauthorized! Access Token was expired!",
    });
  }
  res.status(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (!user) return res.status(404).send({ message: "User not found." });
    if (user.role === 0) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require user role!",
    });
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (!user) return res.status(404).send({ message: "User not found." });
    if (user.role === 1) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require admin role!",
    });
  });
};

const isSuperAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (!user) return res.status(404).send({ message: "User not found." });
    if (user.role === 2) {
      next();
      return;
    }
    res.status(403).send({
      message: "Require superadmin role!",
    });
  });
};

const isNotUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (!user) return res.status(404).send({ message: "User not found." });
    if (user.role !== 0) {
      next();
      return;
    }
    res.status(403).send({
      message: "Action forbidden.",
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
  isSuperAdmin: isSuperAdmin,
  isNotUser: isNotUser,
};
module.exports = authJwt;
