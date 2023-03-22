import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: false,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "https://static.thenounproject.com/png/5100711-200.png",
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
