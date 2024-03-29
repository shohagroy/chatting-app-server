const User = require("./user.model");

const createOrUpdateService = async (info) => {
  try {
    const result = await User.findOneAndUpdate({ id: info.id }, info, {
      new: true,
      upsert: true,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllUserService = async (id) => {
  try {
    const result = await User.find({
      id: {
        $ne: id,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrUpdateService,
  getAllUserService,
};
