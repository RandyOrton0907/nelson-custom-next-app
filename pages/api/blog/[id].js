import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModels";
connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      await getBlog(req, res);
      break;
  }
}

const getBlog = async (req, res) => {
  try {
    const { id } = req.query;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(400).json({ err: "This blog dose not exist" });
    res.json({
      blog,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
