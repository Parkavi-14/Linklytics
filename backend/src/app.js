const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// Pass the array directly to origin. The cors package handles the matching automatically!
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://linklytics-self.vercel.app",
      "https://linklytics-c3nenydrs-parkavi-sundar-s-projects.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Make sure body parsers are below CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Linklytics Backend Running Successfully",
  });
});

module.exports = app;