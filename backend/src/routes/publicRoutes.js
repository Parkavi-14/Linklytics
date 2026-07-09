const express = require("express");
const router = express.Router();

const {
  getPublicStats,
} = require("../controllers/publicController");

router.get("/:shortCode", getPublicStats);

module.exports = router;