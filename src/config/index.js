require("dotenv").config();

const env = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  sectect_token: process.env.SECTECT_TOKEN_KEY,
};

module.exports = env;
