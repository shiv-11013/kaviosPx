require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const passport = require("passport");
const albumRouter = require("./routes/album.routes");
const imageRouter = require("./routes/image.routes");
const cors = require("cors"); // ✅ ADDED

require("./config/passport");

const app = express();

// ADDED (CORS fix)
app.use(
  cors({
    origin: "http://localhost:3000", 
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
app.use("/api/albums", imageRouter);

module.exports = app;