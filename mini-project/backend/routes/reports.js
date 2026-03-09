const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});
const upload = multer({ storage: storage });

// POST route - Add a new report
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, description, location, status } = req.body;
        
        // Ensure image is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const newReport = new Report({
            title,
            description,
            location,
            status,
            imagePath: `/uploads/${req.file.filename}`
        });

        await newReport.save();
        res.status(201).json({ message: 'Report created successfully', report: newReport });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'Server error while creating report' });
    }
});

// GET route - Fetch all reports (Limited to 50 for efficiency)
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 }).limit(50);
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Server error while fetching reports' });
    }
});

module.exports = router;
