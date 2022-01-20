import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

export async function validateCreating(req, res, next) {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` });
  }
  next();
}

export async function validateUpdating(req, res, next) {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.unknown") {
      return res
        .status(400)
        .json({ message: `Field ${err.message.replace(/"/g, "")}` });
    }
    return res.status(400).json({ message: `missing fields` });
  }
  next();
}
