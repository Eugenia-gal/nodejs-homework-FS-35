import Joi from "joi";
import { HttpCode } from "../../../lib/constants.js";

const createSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function validateCreating(req, res, next) {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "Bad Request",
      code: HttpCode.BAD_REQUEST,
      data: { message: `Field ${err.message.replace(/"/g, "")}` },
    });
  }
  next();
}

export async function validateLogin(req, res, next) {
  try {
    await loginSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "Bad Request",
      code: HttpCode.BAD_REQUEST,
      data: { message: `Field ${err.message.replace(/"/g, "")}` },
    });
  }
  next();
}
