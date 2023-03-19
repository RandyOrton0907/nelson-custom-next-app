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
    const product = await Product.find();
    res.json({
      status: "success",
      result: product.length,
      product,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
