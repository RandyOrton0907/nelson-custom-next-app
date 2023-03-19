import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModels";
import valid from "../../../utils/validForm";
import bcrypt from "bcrypt";

connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
}

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      passWord,
      cfPassWord,
      email,
      phoneNumber,
    } = req.body;
    const errMess = valid(
      firstName,
      lastName,
      userName,
      passWord,
      cfPassWord,
      email,
      phoneNumber
    );
    if (errMess) return res.status(400).json({ err: errMess });
    const passWordHash = await bcrypt.hash(passWord, 12);
    const newUser = new Users({
      firstName,
      lastName,
      userName,
      passWord: passWordHash,
      cfPassWord,
      email,
      phoneNumber,
    });
    await newUser.save();
    res.json({ msg: "Register success" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
