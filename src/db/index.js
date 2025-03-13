/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env]["database"];

const db = {};

let connectionString;

if (config.dialect === "mongodb") {
  connectionString =
    config.username && config.password
      ? `mongodb://${config.username}:${config.password}@${config.host}/${config.databaseName}`
      : `mongodb://${config.host}/${config.databaseName}`;

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
} else {
  console.error("Invalid database dialect. Only MongoDB is supported.");
}

db.mongoose = mongoose;
module.exports = db;
