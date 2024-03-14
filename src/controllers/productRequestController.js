// productRequestController.js
const ProductRequest = require('../models/productRequestModel');
const cloudinary = require('../config/cloudinarConfig');

exports.createProductRequest = async (req, res) => {    
    try {
        const { userId, productName, description } = req.body;
        const picturePath = req.file.filename;
        const result = await cloudinary.uploader.upload(req.file.path);

        const requestId = await ProductRequest.createProductRequest(userId, productName, description, result.url);
        res.status(201).json({ id: requestId, productName, description });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getProductRequestsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const productRequests = await ProductRequest.getProductRequestsByUserId(userId);
        res.status(200).json(productRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllProductRequests = async (req, res) => {
    try {
    console.log('sadsadas')

        const requests = await ProductRequest.getAllProductRequests();
        res.json(requests);
    } catch (error) {
    console.log('sadsadas')

        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.getProductRequestById = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const request = await ProductRequest.getProductRequestById(requestId);
        if (!request) {
            res.status(404).json({ error: "Product request not found" });
            return;
        }
        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateProductRequestStatus = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { status } = req.body;
        const updated = await ProductRequest.updateProductRequestStatus(requestId, status);
        if (!updated) {
            res.status(404).json({ error: "Product request not found" });
            return;
        }
        res.json({ message: "Product request status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
