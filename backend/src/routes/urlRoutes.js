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

// 1. Create a short URL (Handles BOTH "/api/url/create" and "/api/url")
router.post("/create", protect, createShortUrl);
router.post("/", protect, createShortUrl); // 👈 ADDED: Fixes the "Unable to create URL" 404 error!

// 2. Fetch User URLs (Handles BOTH "/api/url/my-urls" and "/api/url")
router.get("/my-urls", protect, getMyUrls);
router.get("/", protect, getMyUrls); 

// 3. Update an existing URL target path (Protected)
router.put("/update/:id", protect, updateUrl);

// 4. Delete a short URL (Protected)
router.delete("/delete/:id", protect, deleteUrl);

// 5. Public dynamic routing parameter goes at the absolute bottom
router.get("/:code", redirectUrl); 

module.exports = router;