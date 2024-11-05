const express = require("express");
const apiRouter = require("./router/index.js");
const cors = require("cors");
const config = require("./config/index.js");

const ACCEPTED_ORIGINS = config.ACCEPTED_ORIGINS;

const options = {
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};

const createServer = () => {
  const server = express();
  server.use(cors(options));
  server.use(express.json());
  apiRouter(server);

  return server;
};

module.exports = createServer;
