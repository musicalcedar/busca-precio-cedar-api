const envPath =
  process.env.NODE_ENV === "development" ? ".env.development" : ".env";
require("dotenv").config({ path: envPath });

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ACCEPTED_ORIGINS: process.env.ACCEPTED_ORIGINS,
};

module.exports = config;
