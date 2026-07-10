const Url = require("../models/Url");
const Visit = require("../models/Visit");
const validator = require("validator");
const generateShortCode = require("../utils/generateShortCode");

// 1. Create Short URL
exports.createShortUrl = async (req, res) => {
  try {
    let { originalUrl, customAlias } = req.body;

    if (customAlias && customAlias.trim() === "") {
      customAlias = null;
    }

    if (!validator.isURL(originalUrl)) {
      return res.status(400).json({ success: false, message: "Invalid URL" });
    }

    let code = customAlias || generateShortCode();

    const exists = await Url.findOne({ shortCode: code });
    if (exists) {
      return res.status(400).json({ success: false, message: "Short code already exists" });
    }

    const url = await Url.create({
      user: req.user._id,
      originalUrl,
      shortCode: code,
      customAlias: customAlias || null,
    });

    res.status(201).json({ success: true, data: url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Get My URLs
exports.getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: urls.length, data: urls });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Delete URL
exports.deleteUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 4. Redirect URL
exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) {
      return res.status(404).send("URL Not Found");
    }

    url.totalClicks++;
    url.lastVisited = new Date();
    await url.save();

    await Visit.create({
      url: url._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 5. Update URL
exports.updateUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    url.originalUrl = originalUrl;
    await url.save();

    res.json({ success: true, message: "URL updated successfully", data: url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};