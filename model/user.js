import mongoose from "mongoose";
import { Role } from "../lib/constants.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re =
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        return re.test(String(value).trim().toLowerCase());
      },
    },
    subscription: {
      type: String,
      enum: [Role.STARTER, Role.PRO, Role.BUSINESS],
      default: Role.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: "Guest",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// TODO:

const User = model("contact", userSchema);

export default User;
