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
    const category = await Category.find();
    res.json({
      status: "success",
      result: category.length,
      category,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
