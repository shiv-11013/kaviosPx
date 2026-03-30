const express = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleLogin,
);

module.exports = router;
