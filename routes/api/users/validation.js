import Joi from "joi";
import { HttpCode } from "../../../lib/constants.js";

const repeatEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export async function validateRepeatVerifyEmail(req, res, next) {
  try {
    await repeatEmailSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "Bad Request",
      code: HttpCode.BAD_REQUEST,
      data: { message: `Field ${err.message.replace(/"/g, "")}` },
    });
  }
  next();
}
