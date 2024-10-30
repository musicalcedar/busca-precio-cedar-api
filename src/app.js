const express = require("express");
const apiRouter = require("./router/index.js");
const cors = require("cors");

const createServer = () => {
  const ACCEPTED_ORIGINS = ["https://busca-precios-cedar.vercel.app"];
  const options = {
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  };
  const server = express();
  server.use(cors(options));
  server.use(express.json());
  apiRouter(server);

  return server;
};

module.exports = createServer;
