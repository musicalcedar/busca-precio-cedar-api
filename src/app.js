const express = require("express");
const apiRouter = require("./router/index.js");
const cors = require("cors");

const createServer = () => {
  const server = express();
  server.use(cors());
  server.use(express.json());
  apiRouter(server);

  return server;
};

module.exports = createServer;
