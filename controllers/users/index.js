import { HttpCode } from "../../lib/constants.js";
import Users from "../../repository/users.js";
import {
  UploadFileService,
  LocalFileStorage,
} from "../../service/file-storage/index.js";

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user
  );
  const avatarUrl = await uploadService.updateAvatar();
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.verificationToken;
  const userFromToken = await Users.getUserByVerifyToken(verifyToken);

  if (userFromToken) {
    await Users.updateVerify(userFromToken.id, true);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { message: "Verification successful" },
    });
  }
  res.status(HttpCode.BAD_REQUEST).json({
    status: "Not Found",
    code: HttpCode.BAD_REQUEST,
    data: { message: "User not found" },
  });
};

const repeatEmailForUserVerify = async (req, res, next) => {};

export { uploadAvatar, verifyUser, repeatEmailForUserVerify };
