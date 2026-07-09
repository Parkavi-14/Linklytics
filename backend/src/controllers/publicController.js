const Url = require("../models/Url");
const Visit = require("../models/Visit");

exports.getPublicStats = async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.shortCode,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    const visits = await Visit.find({
      url: url._id,
    }).sort({
      visitedAt: -1,
    });

    // Unwrapped the payload so properties can be accessed directly on the frontend
    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      totalClicks: visits.length || 0,
      createdAt: url.createdAt,
      recentVisits: visits || [],
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};