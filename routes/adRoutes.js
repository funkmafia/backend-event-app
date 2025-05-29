const express = require('express');
const router = express.Router();
const { getAds, addAd ,getAdbyId,updateAd,deleteAd} = require('../controllers/AdController');

// Get all ads
router.get('/', getAds);

// Create new ad
router.post('/', addAd);
// // update a todo

router.put("/:id", updateAd);

router.delete("/:id", deleteAd);


module.exports = router;