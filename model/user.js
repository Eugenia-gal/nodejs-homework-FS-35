import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
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
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: uuidv4(),
      required: [true, "Verify token is required"],
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

export default User;
