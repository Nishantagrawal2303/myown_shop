const Product = require("../models/Product");

// ADD PRODUCT (Admin only)
exports.createProduct = async (req, res) => {
  try {
    // If an image was uploaded, assign its path (Cloudinary URL) to req.body.image
    if (req.file) {
      req.body.image = req.file.path;
    }
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS (Public)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    // If an image was uploaded, update req.body.image
    if (req.file) {
      req.body.image = req.file.path;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
