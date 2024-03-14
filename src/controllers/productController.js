// productController.js
const Product = require('../models/productModel');
const cloudinary = require('../config/cloudinarConfig');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getProductsByOwnerId = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const products = await Product.getProductsByOwnerId(ownerId);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.getProductById(productId);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category_id ,container_space, rating, reviews, ownerId} = req.body;
        const picturePath = req.file.filename;
        const result = await cloudinary.uploader.upload(req.file.path);

        const productId = await Product.createProduct(name, description, price, category_id, result.url, container_space,rating, reviews,ownerId);
        res.status(201).json({ id: productId, name, description, price, category_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { name, description, price, categoryId ,container_space, rating, reviews } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);
        const updated = await Product.updateProduct(productId, name, description, price, categoryId,  result.url , container_space, rating, reviews);
        if (!updated) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json({ id: productId, name, description, price, categoryId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deleted = await Product.deleteProduct(productId);
        if (!deleted) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getProductsByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.getProductsByCategoryId(categoryId);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getProductsByOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const products = await Product.getProductsByOrderId(orderId);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};