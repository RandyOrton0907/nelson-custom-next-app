import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModels";
import bcrypt from "bcrypt";
import auth from "../../../middleware/auth";
connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "PATCH":
      await resetPassword(req, res);
      break;
  }
}

const resetPassword = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { passWord } = req.body;
    const passwordHash = await bcrypt.hash(passWord, 12);
    await Users.findOneAndUpdate(
      { _id: result.id },
      { passWord: passwordHash }
    );
    res.json({ msg: "Update Success!" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
