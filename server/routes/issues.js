const express = require('express');
const {
    createIssue,
    getIssues,
    updateIssueStatus,
    addComment,
    upvoteIssue
} = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { validateIssue } = require('../middleware/validator');

const router = express.Router();

router.route('/')
    .get(getIssues)
    .post(protect, authorize('student'), upload.single('image'), validateIssue, createIssue);

router.route('/:id')
    .put(protect, authorize('admin', 'faculty'), updateIssueStatus);

router.post('/:id/comment', protect, addComment);
router.post('/:id/upvote', protect, upvoteIssue);

module.exports = router;
