const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getAnalytics,
} = require("../controllers/analyticsController");

// GET Analytics by URL ID
router.get("/:id", protect, getAnalytics);

module.exports = router;