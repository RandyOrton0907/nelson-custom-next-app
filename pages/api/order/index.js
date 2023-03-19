import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
import Orders from "../../../models/orderModels";

connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrderDetail(req, res);
      break;
  }
}
const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      cart,
      total,
      pay,
      payerId,
    } = req.body;
    const newOrder = new Orders({
      user: result.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      cart,
      total,
      pay,
      payerId,
    });
    await newOrder.save();
    console.log(newOrder);
    res.json({ msg: "Success", newOrder });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const order = await Orders.find();
    res.json({
      status: "success",
      result: order.length,
      order,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
