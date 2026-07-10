const express = require("express");
const router = express.Router();

const { 
    createShortUrl, 
    getMyUrls, 
    deleteUrl, 
    redirectUrl, 
    updateUrl 
} = require("../controllers/urlController");

// Import protect directly since it uses module.exports = protect
const protect = require("../middleware/authMiddleware");

// Setup application routes

// 1. Create a short URL (Protected)
router.post("/create", protect, createShortUrl);

// 2. Fetch User URLs (Handles BOTH "/api/url" and "/api/url/my-urls" to prevent frontend 404s)
router.get("/my-urls", protect, getMyUrls);
router.get("/", protect, getMyUrls); // 👈 Added this so hitting just "/api/url" works perfectly!

// 3. Update an existing URL target path (Protected)
router.put("/update/:id", protect, updateUrl);

// 4. Delete a short URL (Protected)
router.delete("/delete/:id", protect, deleteUrl);

// 5. Public dynamic routing parameter goes at the absolute bottom
// This matches everything else, so keeping it here prevents it from blocking your other endpoints.
router.get("/:code", redirectUrl); 

module.exports = router;