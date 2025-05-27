const express = require('express');
const router = express.Router();
const { getAds, addAd } = require('../controllers/AdController');

// Get all ads
router.get('/', getAds);

// Create new ad
router.post('/', addAd);

module.exports = router;