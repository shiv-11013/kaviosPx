const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.SMTP_KEY,  
  },
  connectionTimeout: 15000,
  greetingTimeout: 10000, 
  socketTimeout: 20000
});

const sendEmail = async (to, otp) => {
  try {
    console.log("Attempting to send email to:", to); 
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });
    console.log("Email sent successfully!");
    return { success: true };
  } catch (err) {
    console.error("Mail error details:", err); 
    return { success: false, error: err.message };
  }
};

module.exports = sendEmail;
