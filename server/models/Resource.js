const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    resourceName: {
        type: String,
        required: [true, 'Please provide a resource name']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
