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
router.post("/create", protect, createShortUrl);
router.get("/my-urls", protect, getMyUrls);
router.put("/update/:id", protect, updateUrl);
router.delete("/delete/:id", protect, deleteUrl);

// Public dynamic routing parameter goes at the absolute bottom
router.get("/:code", redirectUrl); 

module.exports = router;