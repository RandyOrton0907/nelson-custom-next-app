import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModels";

connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      await getBlogs(req, res);
      break;
  }
}

const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json({
      status: "success",
      result: blog.length,
      blog,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
