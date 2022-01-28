import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../../../controllers/auth/index.js";
import { validateCreating } from "./validation.js";

const router = new Router();

router.post("/signup", validateCreating, signupUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/current", getCurrentUser);

export default router;
