import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../../../controllers/auth/index.js";
const router = new Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/current", getCurrentUser);

export default router;
