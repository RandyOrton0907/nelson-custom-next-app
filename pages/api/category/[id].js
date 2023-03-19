import connectDB from "../../../utils/connectDB";
import Category from "../../../models/categoryModels";
connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      await getCategory(req, res);
      break;
  }
}

const getCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const category = await Category.findById(id);
    if (!category)
      return res.status(400).json({ err: "This category dose not exist" });
    res.json({
      category,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
