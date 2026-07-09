const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

/* =========================
   Middleware
========================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://linklytics-tsw4.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

/* =========================
   Routes
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/public", publicRoutes);

/* =========================
   Health Check
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Linklytics Backend Running Successfully",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Linklytics API Running",
  });
});

/* =========================
   404 Handler
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

module.exports = app; 