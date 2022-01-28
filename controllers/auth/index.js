import { HttpCode } from "../../lib/constants.js";
import AuthService from "../../service/auth/index.js";

const authService = new AuthService();

async function signupUser(req, res, next) {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "Conflict",
      code: HttpCode.CONFLICT,
      data: { message: "Email in use" },
    });
  }
  const newUser = await authService.createUser(req.body);
  res
    .status(HttpCode.OK)
    .json({ status: "created", code: HttpCode.CREATED, data: newUser });
}

async function loginUser(req, res, next) {
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: {} });
}

async function logoutUser(req, res, next) {
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: {} });
}

async function getCurrentUser(req, res, next) {
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: {} });
}

export { signupUser, loginUser, logoutUser, getCurrentUser };
