import User from "../model/user.js";

async function getUserById(contactId) {
  const user = await User.findById(contactId);
  return user;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function addUser(body) {
  const newUser = new User(body);
  return await newUser.save();
}

export default {
  getUserById,
  getUserByEmail,
  addUser,
};
