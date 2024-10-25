const users_schema = require("../Models/users_schema");

const ActualiceTokenUser = async (_id, token) => {
  console.log("token actualized for: ", _id);
  return await users_schema.findOneAndUpdate({ _id }, { token });
};
module.exports = { ActualiceTokenUser };
