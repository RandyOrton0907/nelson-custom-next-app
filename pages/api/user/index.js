import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModels";
import bcrypt from "bcrypt";
import auth from "../../../middleware/auth";
connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "GET":
      await getUser(req, res);
      break;
  }
}
const getUser = async (req, res) => {
  try {
    const user = await Users.find();
    res.json({
      status: "success",
      result: user.length,
      user,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
