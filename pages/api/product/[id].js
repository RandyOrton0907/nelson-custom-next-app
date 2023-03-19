import connectDB from "../../../utils/connectDB";
import Product from "../../../models/productModels";

connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);
    if (!product)
      return res.status(400).json({ err: "This Product dose not exist" });
    res.json({
      product,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
