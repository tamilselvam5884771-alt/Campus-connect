const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// @route   GET api/resources
// @desc    Get all resource requests
// @access  Public (Should be Admin/Faculty)
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find().sort({ date: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST api/resources
// @desc    Request a resource
// @access  Public (Student)
router.post('/', async (req, res) => {
    const resource = new Resource({
        resourceName: req.body.resourceName,
        details: req.body.details
    });

    try {
        const newResource = await resource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT api/resources/:id/status
// @desc    Update resource status
// @access  Public (Admin/Faculty)
router.put('/:id/status', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        resource.status = req.body.status;
        const updatedResource = await resource.save();
        res.json(updatedResource);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
