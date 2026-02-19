const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Resource = require('../models/Resource'); // Adding Resource routes here for simplicity or I should separate.

// @route   GET api/issues
// @desc    Get all issues
// @access  Public
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find().sort({ upvotes: -1 }); // Sort by popularity
        res.json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST api/issues
// @desc    Create an issue
// @access  Public
router.post('/', async (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });

    try {
        const newIssue = await issue.save();
        res.status(201).json(newIssue);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   POST api/issues/:id/upvote
// @desc    Upvote an issue
// @access  Public
router.post('/:id/upvote', async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        issue.upvotes += 1;
        const updatedIssue = await issue.save();
        res.json(updatedIssue);
    } catch (err) {
        res.status(404).json({ message: 'Issue not found' });
    }
});

// @route   POST api/issues/:id/comment
// @desc    Add a comment
// @access  Public
router.post('/:id/comment', async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        const newComment = {
            user: req.body.user || 'Anonymous', // Simplified for now
            text: req.body.text
        };
        issue.comments.push(newComment);
        const updatedIssue = await issue.save();
        res.json(updatedIssue);
    } catch (err) {
        res.status(404).json({ message: 'Issue not found' });
    }
});

// Resources Routes (Temporary placement or need update index.js)
// @route   GET api/issues/resources (A bit weird URL, maybe I should create a separate file. I will create separate file and update index.js)
// But for now let's keep it clean. I will create `routes/resources.js` separately.

module.exports = router;
