const User = require('../models/User');
const Issue = require('../models/Issue');
const Resource = require('../models/Resource');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getAdminStats = async (req, res, next) => {
    try {
        const totalIssues = await Issue.countDocuments();
        const openIssues = await Issue.countDocuments({ status: 'open' });
        const resolvedIssues = await Issue.countDocuments({ status: 'resolved' });
        const totalUsers = await User.countDocuments();
        const pendingResources = await Resource.countDocuments({ status: 'pending' });

        res.status(200).json({
            success: true,
            data: {
                totalIssues,
                openIssues,
                resolvedIssues,
                totalUsers,
                pendingResources
            }
        });
    } catch (err) {
        next(err);
    }
};
