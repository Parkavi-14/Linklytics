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

// 1. Create a short URL
router.post("/create", protect, createShortUrl);
router.post("/", protect, createShortUrl);

// 2. Fetch User URLs (Express checks this first now!)
router.get("/my-urls", protect, getMyUrls);
router.get("/", protect, getMyUrls);

// 3. Update an existing URL
router.put("/update/:id", protect, updateUrl);

// 4. Delete a short URL
router.delete("/delete/:id", protect, deleteUrl);

// ==========================================
// PUBLIC ROUTES (No Authorization Required)
// ==========================================

// 5. Dynamic redirect route MUST go at the absolute bottom!
// This ensures paths like /my-urls are processed correctly first.
router.get("/:code", redirectUrl);

module.exports = router;