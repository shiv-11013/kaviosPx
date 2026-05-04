const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const sendEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });
  } catch (err) {
    console.log("Mail error:", err);
  }
};

module.exports = sendEmail;