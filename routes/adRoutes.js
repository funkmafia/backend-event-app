const express = require("express");
const router = express.Router();
const {
  getAds,
  addAd,
  updateAd,
  removeAd,
} = require("../controllers/adController");

// Get all ads
router.get("/", getAds);

// Create new ad
router.post("/", addAd);

router.put("/:id", updateAd);

router.delete("/:id", removeAd);

module.exports = router;
