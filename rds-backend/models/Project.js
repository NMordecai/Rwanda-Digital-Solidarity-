const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['tech', 'infra', 'energy']
    },
    progress: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'fa-building'
    },
    color: {
        type: String,
        default: '#3b82f6'
    },
    province: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'on-hold', 'planning'],
        default: 'active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);