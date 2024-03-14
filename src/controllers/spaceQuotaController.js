// src/controllers/spaceQuotaController.js

const SpaceQuota = require('../models/spaceQuotaModel');
const Container = require('../models/containerModel');
exports.getUserSpaceQuota = async (req, res) => {
    const userId = req.params.userId;
    try {
        const spaceQuota = await SpaceQuota.getUserSpaceQuota(userId);
        res.json(spaceQuota);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserSpaceQuota = async (req, res) => {
    const userId = req.params.userId;
    const { bookedSpace, containerId } = req.body;
    try {
        // Update user's space quota
        await SpaceQuota.updateUserSpaceQuota(userId, bookedSpace, containerId);
        
        // Update container's available space
        await Container.updateContainerSpace(containerId, bookedSpace);
        
        // Send success response
        res.json({ message: "Space Booked successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error updating user space quota:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
