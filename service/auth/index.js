import jwt from "jsonwebtoken";
import Users from "../../repository/users.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async createUser(body) {
    const { id, name, email, subscription, avatarURL, verificationToken } =
      await Users.addUser(body);
    return { id, name, email, subscription, avatarURL, verificationToken };
  }

  async isUserExist(email) {
    const user = await Users.getUserByEmail(email);
    return !!user;
  }

  async getUser(email, password) {
    const user = await Users.getUserByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword || !user?.verify) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    return token;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }

  async setAvatar(id, avatar) {
    await Users.updateToken(id, avatar);
  }
}

export default AuthService;
