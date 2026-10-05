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
      owner: req.user.id,
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

export const searchProducts = async (req, res, next) => {
  try {
    const { title, price, page = 1, limit = 5 } = req.query;

    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (price === "0-1000") {
      query.price = { $gte: 0, $lte: 1000 };
    } else if (price === "1000-3000") {
      query.price = { $gte: 1000, $lte: 3000 };
    } else if (price === "3000-9000") {
      query.price = { $gte: 3000, $lte: 9000 };
    } else if (price === "9000+") {
      query.price = { $gte: 9000 };
    }
    const currentPage = Number(page);
    const perPage = Number(limit);
    const totlaProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      totlaProducts,
      currentPage,
      totalPages: Math.ceil(totlaProducts / perPage),
      products,
    });
  } catch (error) {
    next(error);
  }
};
