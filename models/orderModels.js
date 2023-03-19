import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    cart: {
      type: Array,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
      trim: true,
    },
    payerId: {
      type: String,
      default: "null",
    },
    delivered: { type: Boolean, default: false },
    pay: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Dataset = mongoose.models.order || mongoose.model("order", orderSchema);
export default Dataset;
