const Resource = require('../models/Resource');
const Notification = require('../models/Notification');

// @desc    Request resource
// @route   POST /api/resources
// @access  Private
exports.requestResource = async (req, res, next) => {
    try {
        req.body.requestedBy = req.user.id;
        const resource = await Resource.create(req.body);

        // Notify admins for dashboard sync
        const io = req.app.get('socketio');
        io.emit('resource_requested', resource);

        res.status(201).json({
            success: true,
            data: resource
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
exports.getResources = async (req, res, next) => {
    try {
        const resources = await Resource.find().populate('requestedBy', 'name email department');
        res.status(200).json({
            success: true,
            data: resources
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Approve/Reject resource
// @route   PUT /api/resources/:id
// @access  Private (Admin)
exports.updateResourceStatus = async (req, res, next) => {
    try {
        let resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ success: false, error: 'Resource request not found' });
        }

        resource = await Resource.findByIdAndUpdate(req.params.id, {
            status: req.body.status,
            approvedBy: req.user.id
        }, { new: true });

        // Notify requester
        const message = `Your resource request for "${resource.resourceName}" has been ${resource.status}`;
        await Notification.create({
            user: resource.requestedBy,
            message,
            type: 'resource'
        });

        const io = req.app.get('socketio');
        io.to(resource.requestedBy.toString()).emit('notification', { message });
        io.emit('resource_updated', resource);

        res.status(200).json({
            success: true,
            data: resource
        });
    } catch (err) {
        next(err);
    }
};
