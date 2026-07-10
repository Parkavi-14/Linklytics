const Url = require("../models/Url");
const validator = require("validator");
const generateShortCode = require("../utils/generateShortCode");

exports.createShortUrl = async (req, res) => {
  try {
    let { originalUrl, customAlias } = req.body;

    // 1. Sanitize customAlias to handle empty frontend inputs ""
    if (customAlias && customAlias.trim() === "") {
      customAlias = null;
    }

    if (!validator.isURL(originalUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
    }

    // 2. Fall back to auto-generated code if no custom alias is provided
    let code = customAlias || generateShortCode();

    // 3. Look up if this shortCode/alias is already in use
    const exists = await Url.findOne({ shortCode: code });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Short code already exists",
      });
    }

    // 4. Create database entry with properly formatted fields
    const url = await Url.create({
      user: req.user._id,
      originalUrl,
      shortCode: code,
      customAlias: customAlias || null, // Ensure it saves as null, never ""
    });

    res.status(201).json({
      success: true,
      data: url,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};