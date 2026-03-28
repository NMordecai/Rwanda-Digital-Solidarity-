const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    adminReply: {
        type: String,
        default: null
    },
    replyDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'replied'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', FeedbackSchema);