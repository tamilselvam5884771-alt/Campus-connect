const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Resource = require('../models/Resource');

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// POST route - Add a new resource
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, description, department } = req.body;
        
        // Ensure image is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const newResource = new Resource({
            title,
            description,
            department,
            imagePath: `/uploads/${req.file.filename}`
        });

        await newResource.save();
        res.status(201).json({ message: 'Resource created successfully', resource: newResource });
    } catch (error) {
        console.error('Error creating resource:', error);
        res.status(500).json({ error: 'Server error while creating resource' });
    }
});

// GET route - Fetch all resources (Limited to 50 for efficiency)
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 }).limit(50);
        res.status(200).json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ error: 'Server error while fetching resources' });
    }
});

module.exports = router;
