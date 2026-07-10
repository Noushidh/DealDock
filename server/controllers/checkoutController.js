import Product from "../../server/models/productModel.js";

export const checkout = async (req, res, next) => {
  try {
    const { productIds } = req.body;
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { isSold: true } },
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error)
}
};
