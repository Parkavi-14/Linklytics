const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    customAlias: {
      type: String,
      default: null,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    lastVisited: {
      type: Date,
      default: null,
    },
    expiresAt: {
    type: Date,
    default: null,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", urlSchema);