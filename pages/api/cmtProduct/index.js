import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModels";
import Product from "../../../models/productModels";
import cmtProduct from "../../../models/postCommentProduct";
connectDB();

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      await Comments(req, res);
      break;
    case "GET":
      await getComments(req, res);
      break;
  }
}

const Comments = async (req, res) => {
  try {
    const { _proId, _userId, comments, vote } = req.body;
    const newComment = new cmtProduct({
      _proId,
      _userId,
      comments,
      vote,
    });
    await newComment.save();
    res.json({ msg: "Register success" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
const getComments = async (req, res) => {
  try {
    const comments = await cmtProduct.find();
    res.json({
      status: "success",
      result: comments.length,
      comments,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
