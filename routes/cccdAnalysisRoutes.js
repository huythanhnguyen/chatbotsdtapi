const express = require('express');
const cccdAnalysisController = require('../controllers/cccdAnalysisController');
// const authMiddleware = require('../middleware/auth'); // No longer needed for public access

const router = express.Router();

// Public route for CCCD analysis
router.post('/analyze-cccd', cccdAnalysisController.analyzeCccd);

module.exports = router;
