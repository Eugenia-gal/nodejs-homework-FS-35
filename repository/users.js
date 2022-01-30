import User from "../model/user.js";

async function getUserById(contactId) {
  const user = await User.findById(contactId);
  return user;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function updateToken(id, token) {
  return await User.updateOne({ _id: id }, { token });
}

async function addUser(body) {
  const newUser = new User(body);
  return await newUser.save();
}

async function updateAvatar(id, avatarURL) {
  return await User.updateOne({ _id: id }, { avatarURL });
}

export default {
  getUserById,
  getUserByEmail,
  addUser,
  updateToken,
  updateAvatar,
};
