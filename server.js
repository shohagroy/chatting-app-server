const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.mongoDB_URI).then(() => {
  app.listen(port, () => {
    console.log(`lests taks server is running port: ${port}`);
  });
});
