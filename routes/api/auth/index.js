import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../../../controllers/auth/index.js";
import { validateCreating, validateLogin } from "./validation.js";
import guard from "../../../middlewares/guard.js";

const router = new Router();

router.post("/signup", validateCreating, signupUser);

router.post("/login", validateLogin, loginUser);

router.get("/logout", guard, logoutUser);

router.get("/current", guard, getCurrentUser);

export default router;
