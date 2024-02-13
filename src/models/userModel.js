import mongoose from "mongoose";

const { Schema } = mongoose;

const userShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    reset: {
      code: {
        type: String,
        default: null,
      },
      time: {
        type: Date,
        default: null,
      },
    },
  },
  { collection: "users", timestamps: true }
);

const User = mongoose.model("users", userShema);

export default User;
