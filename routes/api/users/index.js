import { Router } from "express";
import {
  uploadAvatar,
  verifyUser,
  repeatEmailForUserVerify,
} from "../../../controllers/users/index.js";
import guard from "../../../middlewares/guard.js";
import { upload } from "../../../middlewares/upload.js";
import { validateRepeatVerifyEmail } from "./validation.js";

const router = new Router();

router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:verificationToken", verifyUser);

router.post("/verify", validateRepeatVerifyEmail, repeatEmailForUserVerify);

export default router;
