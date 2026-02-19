const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    },
    comments: [
        {
            user: String,
            text: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    imageUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Issue', IssueSchema);
