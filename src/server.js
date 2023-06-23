const app = require("./app");
const mongoose = require("mongoose");
const env = require("./config/index");
const server = require("./app/socket/socket");

const uri =
  env.node_env !== "production"
    ? "mongodb://127.0.0.1:27017/free_chat"
    : env.db_uri;

async function dbConnection() {
  try {
    if (env.db_uri) {
      await mongoose.connect(uri);
      server.listen(env.port, () => {
        console.log("server listening on port " + env.port);
      });
    } else {
      console.log("db uri is not defined");
    }
  } catch (err) {
    console.log(`Failed to connect database ${err}`);
  }
}

dbConnection();
