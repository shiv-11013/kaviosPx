const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const otpModel = require("../models/otp.model");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/email.service");

exports.googleLogin = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  res.redirect(`${frontendUrl}?token=${token}`);
};

// Email Register
exports.registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Register failed",
    });
  }
};

// Email Login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

// otp Email create

exports.sendOtpController = async (req, res) => {
  console.log("DEBUG: Request received at sendOtpController"); 
  console.log("DEBUG: Request body is:", req.body);
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email: userEmail });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    await otpModel.deleteMany({ email: userEmail });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpString = otp.toString();

    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    const hashedOTP = await bcrypt.hash(otpString, 10);

    await otpModel.create({
      email: userEmail,
      otp: hashedOTP,
      expiry,
    });

    await sendEmail(userEmail, otpString);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

//Verify OTP

exports.verifyOtpController = async (req, res) => {
  try {
    const { userEmail, otp, password } = req.body;

    if (!userEmail || !otp || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const otpData = await otpModel.findOne({ email: userEmail });

    if (!otpData) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    if (otpData.expiry < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const isMatch = await bcrypt.compare(otp.toString(), otpData.otp);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email: userEmail,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    await otpModel.deleteMany({ email: userEmail });

    return res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
