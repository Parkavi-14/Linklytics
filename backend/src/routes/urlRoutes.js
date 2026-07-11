const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  getMyUrls,
  deleteUrl,
  redirectUrl,
  updateUrl,
} = require("../controllers/urlController");

// Import protect directly since it uses module.exports = protect
const protect = require("../middleware/authMiddleware");

// ==========================================
// PUBLIC ROUTES (No Authorization Required)
// ==========================================

// Public redirect route
// Example: GET /api/url/JEx8eb2
router.get("/:code", redirectUrl);

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

module.exports = router;