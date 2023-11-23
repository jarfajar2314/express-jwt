require("dotenv").config();
const env = process.env.NODE_ENV || "development";

const config = require("../config/db.config.js")[env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(
  sequelize,
  Sequelize
);

db.role.hasMany(db.user, {
  foreignKey: "role",
});
db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

db.ROLES = ["user", "admin", "superadmin"];

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync(); // Sync models with the database
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    throw error; // rethrow the error to be caught in server.js
  }
};

module.exports = { db, initializeDatabase };
