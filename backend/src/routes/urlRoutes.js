const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  getMyUrls,
  deleteUrl,
  redirectUrl,
  updateUrl,
} = require("../controllers/urlController");

const protect = require("../middleware/authMiddleware");

// ==========================================
// PROTECTED API ENDPOINTS (Token Required)
// ==========================================

// Create a short URL
router.post("/create", protect, createShortUrl);
router.post("/", protect, createShortUrl);

// Fetch User URLs
router.get("/my-urls", protect, getMyUrls);
router.get("/", protect, getMyUrls);

// Update an existing URL
router.put("/update/:id", protect, updateUrl);

// Delete a short URL
router.delete("/delete/:id", protect, deleteUrl);

// ==========================================
// PUBLIC ROUTES (No Authorization Required)
// ==========================================

// ✨ THE PERFECT FIX: Placed back at the absolute bottom. 
// Express will only hit this if the path doesn't match /create or /my-urls first!
router.get("/:code", redirectUrl);

module.exports = router;