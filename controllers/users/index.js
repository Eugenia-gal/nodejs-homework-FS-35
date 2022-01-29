import { HttpCode } from "../../lib/constants.js";
// import {
//     UploadFileService,
//     LocalFileStorage,
//     CloudFileStorage,
// } from '../../service/file-storage.js';

const uploadAvatar = async (req, res, next) => {
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, message: "Success!" });
  // const uploadService = new UploadFileService(
  //     LocalFileStorage,
  //     req.file,
  //     req.user,
  // );
};

export { uploadAvatar };
