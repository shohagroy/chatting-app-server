const { createUserToDb } = require("./auth.service");

const createUser = async (req, res) => {
  const userData = req.body;

  const response = await createUserToDb(userData);
  console.log("create user");

  res.status(201).json({
    status: true,
    message: "user create sussessfully!",
    data: response,
  });
};

module.exports = {
  createUser,
};
