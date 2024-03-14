// src/controllers/containerController.js

const Container = require('../models/containerModel');

exports.getAvailableContainer = async (req, res) => {
    try {
        const container = await Container.getAvailableContainer();
        res.json(container);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllAvailableContainerAdmin = async (req, res) => {
    try {
        const container = await Container.getAllAvailableContainerAdmin();
        res.json(container);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createContainer = async (req, res) => {
    const { totalSpace } = req.body;
    try {
        await Container.createContainer(totalSpace);
        res.status(201).json({ message: 'Container created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateContainerSpace = async (req, res) => {
    const containerId = req.params.containerId;
    const { usedSpace } = req.body;
    try {
        await Container.updateContainerSpace(containerId, usedSpace);
        res.status(204).json({ message: 'Container Updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.markContainerAsShipped = async (req, res) => {
    const containerId = req.params.containerId;
    try {
        const result = await Container.markContainerAsShipped(containerId);
        if (result === 0) {
            // If no rows were updated, it means the container was not found
            res.status(404).json({ error: 'Container not found' });
        } else {
            // Otherwise, the container was updated successfully
            res.status(204).json({ message: 'Container shipped successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
