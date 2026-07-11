// ==========================================
// 1. CREATE SHORT URL
// ==========================================
const Url = require("../models/Url");
const Visit = require("../models/Visit");
const validator = require("validator");
const generateShortCode = require("../utils/generateShortCode");

// ==========================================
// 1. CREATE SHORT URL (Fixed Expiry Handling)
// ==========================================
exports.createShortUrl = async (req, res) => {
  try {
    let { originalUrl, customAlias, expiryDate } = req.body;

    if (customAlias && customAlias.trim() === "") {
      customAlias = null;
    }

    // ✨ THE FIX: If expiryDate is empty, null, or missing, explicitly make it null 
    // so MongoDB doesn't mark the link as expired immediately!
    if (!expiryDate || expiryDate.trim() === "") {
      expiryDate = null;
    }

    if (!validator.isURL(originalUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
    }

    const code = customAlias || generateShortCode();

    const exists = await Url.findOne({
      shortCode: code,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Short code already exists",
      });
    }

    // Pass the cleaned expiryDate parameter explicitly into your creation context
    const url = await Url.create({
      user: req.user._id,
      originalUrl,
      shortCode: code,
      customAlias: customAlias || null,
      expiryDate: expiryDate, // 👈 Ensures links stay permanent if no date chosen
    });

    return res.status(201).json({
      success: true,
      data: url,
    });
  } catch (err) {
    console.error("Create Short URL Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// 2. GET MY URLS
// ==========================================
exports.getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (err) {
    console.error("Get My URLs Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// 3. DELETE URL
// ==========================================
exports.deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Url.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.error("Delete URL Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// 4. REDIRECT URL
// ==========================================
exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.code,
    });

    if (!url) {
      return res.status(404).send("URL Not Found");
    }

    // Safely increase click count
    url.totalClicks = (url.totalClicks || 0) + 1;

    // Save last visit date
    url.lastVisited = new Date();

    await url.save();

    // Store visit information for analytics
    await Visit.create({
      url: url._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "Unknown",
    });

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Redirect URL Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// 5. UPDATE URL
// ==========================================
exports.updateUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    url.originalUrl = originalUrl;
    await url.save();

    return res.status(200).json({
      success: true,
      message: "URL updated successfully",
      data: url,
    });
  } catch (err) {
    console.error("Update URL Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};