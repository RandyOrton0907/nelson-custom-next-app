import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
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
  mongoose.models.category || mongoose.model("category", categorySchema);
export default Dataset;
