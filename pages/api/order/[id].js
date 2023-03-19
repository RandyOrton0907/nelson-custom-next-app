import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModels";

connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      await getOrders(req, res);
      break;
  }
}

const getOrders = async (req, res) => {
  try {
    const { id } = req.query;
    const order = await Orders.findById(id);
    if (!order)
      return res.status(400).json({ err: "This order dose not exist" });
    res.json({
      order,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
