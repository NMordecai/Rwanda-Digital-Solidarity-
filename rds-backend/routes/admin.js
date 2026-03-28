const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/stats', (req, res) => {
    res.json({ success: true, data: { message: 'Admin stats' } });
});

module.exports = router;