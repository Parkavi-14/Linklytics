const Url = require("../models/Url");
const Visit = require("../models/Visit");

exports.getAnalytics = async (req, res) => {
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

    // Fetch ALL visits
    const visits = await Visit.find({
      url: url._id,
    }).sort({
      visitedAt: -1,
    });

    res.status(200).json({
      success: true,
      data: {
        _id: url._id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        totalClicks: visits.length,
        lastVisited:
          visits.length > 0
            ? visits[0].visitedAt
            : null,
        createdAt: url.createdAt,
        recentVisits: visits,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};