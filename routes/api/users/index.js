import { Router } from "express";
import { uploadAvatar } from "../../../controllers/users/index.js";
import guard from "../../../middlewares/guard.js";
import { upload } from "../../../middlewares/upload.js";

const router = new Router();

router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

export default router;
