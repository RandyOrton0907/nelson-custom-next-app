import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModels";
import jwt from "jsonwebtoken";
import {
  CreateAccessToken,
  CreateRefreshToken,
} from "../../../utils/genegrateToken";

connectDB();

export default async function handle(req, res) {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: "Please login now!" });
    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has exprired" });
    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "User does not exist" });
    const access_token = CreateRefreshToken({ id: user._id });
    res.json({
      access_token,
      _id: user._id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      avatar: user.avatar,
      root: user.root,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
}
