import mongoose from "mongoose";
const postCommentProductSchema = new mongoose.Schema(
  {
    _proId: { type: mongoose.Types.ObjectId, ref: "product" },
    _userId: { type: mongoose.Types.ObjectId, ref: "user" },
    vote: { type: Number, required: true },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const Dataset =
  mongoose.models.comment_Product ||
  mongoose.model("comment_Product", postCommentProductSchema);
export default Dataset;
