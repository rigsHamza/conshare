const Shipping = require('../models/shippingModel');

// exports.createShipping = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const { address, city, country } = req.body;
//         const shippingId = await Shipping.createShipping(userId, address, city, country);
//         res.status(201).json({ id: shippingId, userId, address, city, country });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
exports.createShipping = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { fullName, address, email, zipcode, country, companyName, phoneNumber } = req.body;
        const shippingId = await Shipping.createShipping(userId, fullName, address, email, zipcode, country, companyName, phoneNumber);
        res.status(201).json({ id: shippingId, userId, fullName, address, email, zipcode, country, companyName, phoneNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateShipping = async (req, res) => {
    try {
        const shippingId = req.params.shippingId;
        const { address, city, country } = req.body;
        const updated = await Shipping.updateShipping(shippingId, address, city, country);
        if (!updated) {
            res.status(404).json({ error: "Shipping details not found" });
            return;
        }
        res.json({ message: "Shipping details updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getShippingByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const shippings = await Shipping.getShippingByUserId(userId);
        res.json(shippings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
