import Users from "../../repository/users.js";

class AuthService {
  async createUser(body) {
    const { id, name, email, subscription } = await Users.addUser(body);
    return { id, name, email, subscription };
    };

  async isUserExist(email) {
      const user = await Users.getUserByEmail(email);
      console.log(user);
    return !!user;
    };
}

export default AuthService;
