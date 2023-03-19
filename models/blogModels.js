import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
      default:
        "https://www.toponseek.com/blogs/wp-content/uploads/2022/06/viet-blog-3.jpg",
    },
  },
  { timestamps: true }
);
const Dataset = mongoose.models.blog || mongoose.model("blog", blogSchema);
export default Dataset;
