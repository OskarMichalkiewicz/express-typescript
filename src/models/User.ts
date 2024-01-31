import { Schema, Document, model, Model, InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET || "",
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

interface IUser extends InferSchemaType<typeof UserSchema> {
  createJWT: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

export default model<IUser>("User", UserSchema);
