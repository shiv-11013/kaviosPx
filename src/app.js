require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

// Routers
const authRouter = require("./routes/auth.routes");
const albumRouter = require("./routes/album.routes");
const imageRouter = require("./routes/image.routes");

require("./config/passport");

const app = express();


const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/albums", albumRouter);
app.use("/api/images", imageRouter);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;
