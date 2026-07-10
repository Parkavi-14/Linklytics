const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// Add all your stable production domains here
const allowedOrigins = [
  "http://localhost:5173",
  "https://linklytics-self.vercel.app",
  "https://linklytics-c3nenydrs-parkavi-sundar-s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Allow internal/serverless/Postman requests with no origin
      if (!origin) return callback(null, true);

      // 2. Allow if it matches our explicitly listed stable domains
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // 3. ✨ DYNAMIC FIX: Handled hyphen string check safely
      if (origin.endsWith(".vercel.app") && origin.includes("parkavi-sundar")) { // 👈 Fixed underscore to hyphen
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
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