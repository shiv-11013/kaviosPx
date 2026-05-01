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

//Add: Email Register
router.post("/register", authController.registerController);

//Add: Email Login
router.post("/login", authController.loginController);
module.exports = router;
