import Product from "../models/productModel.js";

export const fetchProducts = async (req, res) => {
  const products = await Product.find({ isSold: false });

  res.status(200).json({ success: true, products });
};

export const AddProduct = async (req, res, next) => {
  try {
    const { title, price, description } = req.body;

    const imageUrls = req.files.map((file) => file.path);
    const product = await Product.create({
      title,
      price,
      description,
      images: imageUrls,
    });
    res
      .status(201)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    next(error);
  }
};

export const EditProduct = async (req, res, next) => {
  try {
    const { title, price, description } = req.body;
    const id = req.params.id;

    const updateData = { title, price, description };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
};

export const DeleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "delete successfully", id });
  } catch (error) {
    next(error);
  }
};
