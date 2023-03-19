import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const Dataset =
  mongoose.models.payment || mongoose.model("payment", paymentSchema);
export default Dataset;
