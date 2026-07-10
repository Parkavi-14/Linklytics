const express = require("express");
const router = express.Router();

// 1. Import the controller functions safely
const { 
    createShortUrl, 
    getMyUrls, 
    deleteUrl, 
    redirectUrl, 
    updateUrl 
} = require("../controllers/urlController");

// 2. Import authentication middleware safely
const authMiddleware = require("../middlewares/authMiddleware");

// Handle both standard default exports (module.exports = protect) 
// and named object exports (module.exports = { protect })
const protect = authMiddleware.protect || authMiddleware;

// 3. Setup your application route definitions

// Create a short URL (Protected)
router.post("/create", protect, createShortUrl);

// Get all URLs created by the logged-in user (Protected)
router.get("/my-urls", protect, getMyUrls);

// Update an existing URL target path (Protected)
router.put("/update/:id", protect, updateUrl);

// Delete a short URL (Protected)
router.delete("/delete/:id", protect, deleteUrl);

// Public redirection route (Hits when someone clicks your short link)
// Place this at the bottom so it doesn't intercept specific words like "/create" or "/my-urls"
router.get("/:code", redirectUrl); 

module.exports = router;