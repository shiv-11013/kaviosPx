const jwt = require("jsonwebtoken");

exports.googleLogin = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  const frontendUrl = process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:3000";

  res.redirect(`${frontendUrl}?token=${token}`);
};