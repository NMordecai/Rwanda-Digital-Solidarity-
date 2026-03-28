const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Simple placeholder
router.post('/', protect, (req, res) => {
    res.json({ success: true, message: 'Feedback received' });
});

module.exports = router;