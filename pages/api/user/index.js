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
    case "PATCH":
      await uploadInfor(req, res);
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
const uploadInfor = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { firstName, lastName, phoneNumber, address, avatar } = req.body;
    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      { firstName, lastName, phoneNumber, address, avatar }
    );
    res.json({
      msg: "Update Success!",
      user: {
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        firstName,
        lastName,
        phoneNumber,
        address,
        role: newUser.role,
        avatar,
        root: newUser.root,
      },
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
