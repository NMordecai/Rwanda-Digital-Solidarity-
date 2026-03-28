const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getProjects);
router.post('/', protect, authorize('admin'), createProject);

module.exports = router;