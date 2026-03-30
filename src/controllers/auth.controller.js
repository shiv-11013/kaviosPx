const jwt = require("jsonwebtoken");

exports.googleLogin = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({ token });
};