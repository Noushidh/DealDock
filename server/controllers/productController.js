import Product from "../models/productModel.js";

export const fetchProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
};

export const AddProduct = async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
  }
};

export const EditProduct = async (req, res) => {
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
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
