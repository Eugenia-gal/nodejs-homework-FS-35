import { HttpCode } from "../../lib/constants.js";
import Users from "../../repository/users.js";
import {
  UploadFileService,
  LocalFileStorage,
} from "../../service/file-storage/index.js";
import { EmailService, SenderSendGrid } from "../../service/email/index.js";

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

const repeatEmailForUserVerify = async (req, res, next) => {
  const user = await Users.getUserByEmail(req.body.email);
  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "Not Found",
      code: HttpCode.NOT_FOUND,
      data: { message: "User not found" },
    });
  }

  if (user.verify) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "Bad Request",
      code: HttpCode.BAD_REQUEST,
      data: { message: "Verification has already been passed" },
    });
  }

  const { email, name, verificationToken } = user;
  const emailService = new EmailService(
    process.env.NODE_ENV,
    new SenderSendGrid()
  );

  const isSend = await emailService.sendVerifyEmail(
    email,
    name,
    verificationToken
  );

  if (isSend) {
    return res.status(HttpCode.OK).json({
      status: "Ok",
      code: HttpCode.OK,
      data: { message: "Verification email sent" },
    });
  }
  res.status(HttpCode.UE).json({
    status: "error",
    code: HttpCode.UE,
    data: { message: "Unprocessable Entity" },
  });
};

export { uploadAvatar, verifyUser, repeatEmailForUserVerify };
