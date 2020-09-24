import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { BCRYPT_WORK_FACTOR } from "../config/index.js";

const { compare, hash } = bcryptjs;
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    username: String,
    name: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }, options) => rest,
});

export const User = model("User", userSchema);
