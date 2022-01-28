import Joi from "joi";
// import mongoose from "mongoose";
import { HttpCode } from "../../../lib/constants.js";

// const { Types } = mongoose;

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

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// export async function validateId(req, res, next) {
//   if (!Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: "Invalid ObjectId" });
//   }
//   next();
// }

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

// export const validateUpdatingFavorite = async (req, res, next) => {
//   try {
//     await updateFavoriteSchema.validateAsync(req.body);
//   } catch (err) {
//     const [{ type }] = err.details;
//     if (type === "object.missing") {
//       return res.status(400).json({ message: "missing field favorite" });
//     }
//     return res.status(400).json({ message: err.message });
//   }
//   next();
// };
