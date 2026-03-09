const Issue = require('../models/Issue');
const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private (Student)
exports.createIssue = async (req, res, next) => {
    try {
        req.body.reportedBy = req.user.id;

        // Handle image path if uploaded
        if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`;
        }

        const issue = await Issue.create(req.body);

        // Trigger Socket.io event for real-time dashboard/home update
        const io = req.app.get('socketio');
        io.emit('issue_created', issue);

        res.status(201).json({
            success: true,
            data: issue
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public
exports.getIssues = async (req, res, next) => {
    try {
        const issues = await Issue.find().populate('reportedBy', 'name email department').sort('-createdAt');
        res.status(200).json({
            success: true,
            count: issues.length,
            data: issues
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update issue status
// @route   PUT /api/issues/:id
// @access  Private (Admin/Faculty)
exports.updateIssueStatus = async (req, res, next) => {
    try {
        let issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ success: false, error: 'Issue not found' });
        }

        issue = await Issue.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
            new: true,
            runValidators: true
        });

        // Create persistent notification for the reporter
        const message = `Your issue "${issue.title}" status has been updated to ${issue.status}`;
        await Notification.create({
            user: issue.reportedBy,
            message,
            type: 'issue'
        });

        // Emit real-time notification to the user
        const io = req.app.get('socketio');
        io.to(issue.reportedBy.toString()).emit('notification', { message });

        // Notify all for dashboard sync
        io.emit('issue_updated', issue);

        res.status(200).json({
            success: true,
            data: issue
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Comment on issue
// @route   POST /api/issues/:id/comment
// @access  Private
exports.addComment = async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ success: false, error: 'Issue not found' });
        }

        const comment = {
            user: req.user.id,
            message: req.body.message
        };

        issue.comments.push(comment);
        await issue.save();

        // Notify issue reporter if someone else commented
        if (issue.reportedBy.toString() !== req.user.id) {
            const message = `${req.user.name} commented on your issue "${issue.title}"`;
            await Notification.create({
                user: issue.reportedBy,
                message,
                type: 'issue'
            });
            const io = req.app.get('socketio');
            io.to(issue.reportedBy.toString()).emit('notification', { message });
        }

        res.status(200).json({
            success: true,
            data: issue.comments
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Upvote issue
// @route   POST /api/issues/:id/upvote
// @access  Private
exports.upvoteIssue = async (req, res, next) => {
    try {
        const issue = await Issue.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });

        if (!issue) {
            return res.status(404).json({ success: false, error: 'Issue not found' });
        }

        res.status(200).json({
            success: true,
            data: issue.upvotes
        });
    } catch (err) {
        next(err);
    }
};
