const Feedback = require('../../models/Feedback');
const Project = require('../../models/Project');
const User = require('../../models/User');

// @desc    Create feedback
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res) => {
    try {
        const { project, projectId, text, rating } = req.body;

        // Add user to req.body
        req.body.user = req.user.id;

        // Find project by name or ID
        let projectData;
        if (projectId) {
            projectData = await Project.findById(projectId);
        } else {
            projectData = await Project.findOne({ name: project });
        }

        if (projectData) {
            req.body.projectId = projectData._id;
        }

        const feedback = await Feedback.create(req.body);

        // Update user impact points
        let pointsEarned = 10;
        if (rating) pointsEarned += rating * 2;

        const user = await User.findById(req.user.id);
        user.impactPoints += pointsEarned;
        user.reportsCount += 1;

        // Update badges based on reports count
        if (user.reportsCount === 1 && !user.badges.includes('First Report')) {
            user.badges.push('First Report');
        }
        if (user.reportsCount >= 5 && !user.badges.includes('Active Citizen')) {
            user.badges.push('Active Citizen');
        }
        if (user.reportsCount >= 10 && !user.badges.includes('Community Champion')) {
            user.badges.push('Community Champion');
        }
        if (user.impactPoints >= 100 && !user.badges.includes('Contributor')) {
            user.badges.push('Contributor');
        }
        if (user.impactPoints >= 500 && !user.badges.includes('Elite Member')) {
            user.badges.push('Elite Member');
        }

        await user.save();

        res.status(201).json({
            success: true,
            data: feedback,
            pointsEarned
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get user's feedback
// @route   GET /api/feedback/myfeedback
// @access  Private
exports.getMyFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get feedback for a project
// @route   GET /api/feedback/project/:projectId
// @access  Public
exports.getProjectFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({ projectId: req.params.projectId })
            .populate('user', 'name profilePicture')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all feedback (Admin only)
// @route   GET /api/feedback/all
// @access  Private/Admin
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find()
            .populate('user', 'name email profilePicture')
            .populate('projectId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Reply to feedback (Admin only)
// @route   PUT /api/feedback/:id/reply
// @access  Private/Admin
exports.replyToFeedback = async (req, res) => {
    try {
        const { reply } = req.body;

        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }

        feedback.adminReply = reply;
        feedback.replyDate = Date.now();
        feedback.status = 'replied';
        await feedback.save();

        res.status(200).json({
            success: true,
            data: feedback
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};