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

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : ["http://localhost:3000"],
    credentials: true,
  }),
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
