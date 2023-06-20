require("dotenv").config();

const env = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  sectect_token: process.env.SECTECT_TOKEN_KEY,
  google_client_id: process.env.GOOGGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGGLE_CLIENT_SECRET,
  google_call_back_url: process.env.GOOGGLE_CALL_BACK_URL,
  client_redirect: process.env.CLIENT_REDIRECT,
};

module.exports = env;
