const Category = require('../models/categoryModel');
const cloudinary = require('../config/cloudinarConfig');
exports.createCategory = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const { name } = req.body;
        const picturePath = req.file.filename; // Relative path to the image
        const categoryId = await Category.createCategory(name, result.url);
        res.status(201).json({ message: 'Category created successfully', categoryId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

          



exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.getCategoryById(categoryId);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        // Delete products associated with the category first
        await Category.deleteProductsByCategoryId(categoryId);
        // Then delete the category itself
        const deletedCategory = await Category.deleteCategoryById(categoryId);
        if (!deletedCategory) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json({ message: 'Category and associated products deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

