const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createShortUrl,
  getMyUrls,
  deleteUrl,
  redirectUrl,
  updateUrl,
} = require("../controllers/urlController");

router.post("/", protect, createShortUrl);

router.get("/", protect, getMyUrls);

router.put("/:id", protect, updateUrl);

router.delete("/:id", protect, deleteUrl);

// Keep redirect LAST
router.get("/:code", redirectUrl);

module.exports = router;