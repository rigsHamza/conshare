const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const { user_id, products, total_amount, status } = req.body;
        const orderId = await Order.createOrder(user_id, products, total_amount, status);
        res.status(201).json({ id: orderId, user_id, products, total_amount, status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getOrdersByUserID = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.getOrdersByUserID(userId);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.getOrderById(orderId);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;
        const updated = await Order.updateOrderStatus(orderId, status);
        if (!updated) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deleted = await Order.deleteOrder(orderId);
        if (!deleted) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
