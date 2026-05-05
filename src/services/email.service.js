const axios = require("axios");

const sendEmail = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "KaviosPx",
          email: process.env.EMAIL_USER,
        },
        to: [{ email: email }],
        subject: "Your OTP Verification",
        htmlContent: `<p>Your OTP code is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY, // Yeh aapka .env wala key hai
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Email sent successfully via Brevo");
    return response.data;
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.data || error.message,
    );
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
