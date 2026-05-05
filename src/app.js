require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const passport = require("passport");
const albumRouter = require("./routes/album.routes");
const imageRouter = require("./routes/image.routes");
const cors = require("cors");

require("./config/passport");
// Good Luck
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000"];

console.log("CORS Allowed Origins:", allowedOrigins); // Debugging ke liye logs mein check karna

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/albums", albumRouter);

app.use("/api/images", imageRouter);

module.exports = app;
