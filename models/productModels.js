import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    _cateId: { type: mongoose.Types.ObjectId, ref: "category" },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    currentPrice: {
      type: Number,
      required: false,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    sku: {
      type: String,
      required: false,
      trim: true,
    },
    images: {
      type: Array,
      required: true,
      trim: true,
    },
    productInventory: {
      type: Number,
      required: true,
      trim: true,
    },
    size: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;
