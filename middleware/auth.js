import jwt from "jsonwebtoken";
import User from "../models/userModels";

const auth = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ err: "Invalid Authentication." });
  const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findOne({ _id: check.id });
  return { id: user._id };
};
export default auth;
