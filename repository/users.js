import User from "../model/user.js";

async function getUserById(contactId) {
  const user = await User.findById(contactId);
  return user;
}

async function getUserByEmail(userEmail) {
  const user = await User.findOne({ userEmail });
  console.log(user);
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
