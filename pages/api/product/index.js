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
class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  filtering() {
    const queryObj = { ...this.querystr };
    if (queryObj.category !== "all")
      this.query.find({ _cateId: queryObj.category });
    if (queryObj.search !== "all") this.query.find({ name: queryObj.search });
    if (queryObj.size !== "all")
      this.query.find({ size: { $all: [queryObj.size] } });
    if (queryObj.price !== "all")
      this.query.find({ currentPrice: { $lt: queryObj.price } });

    this.query.find();
    return this;
  }
  sortBy() {
    if (this.querystr.sort) {
      const sortBy = this.querystr.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
}

const getProduct = async (req, res) => {
  try {
    const features = new ApiFeatures(Product.find(), req.query)
      .filtering()
      .sortBy();
    const product = await features.query;
    res.json({
      status: "success",
      result: product.length,
      product,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
