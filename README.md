# 📷 KaviosPix

KaviosPix is a robust image management backend API, designed to provide a secure and scalable environment for managing personal digital media, inspired by the Google Photos architecture.

Users can securely authenticate, create albums, upload images, and manage their collections with ease.

## 🚀 Live API

https://kaviospx.onrender.com

---

## ⚙️ Tech Stack

* **Runtime:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** Passport.js (Google OAuth 2.0), Custom JWT-based Email/OTP Auth
* **Email Service:** Brevo (Transactional Email API)
* **File Handling:** Multer, ImageKit
* **Communication:** Axios

---

## 🔐 Hybrid Authentication System

KaviosPix now supports a flexible, dual-authentication flow to enhance user experience and security:

1. **Google OAuth 2.0:** Seamless "One-Click" login for users who prefer using their existing Google accounts.
2. **Email/OTP Verification:** A secure, traditional registration flow where users register via email and verify their identity using a One-Time Password (OTP) generated via Brevo API.

*Both flows result in a secure JWT-based session management system.*

---

## 📦 Key Features

* **Multi-Auth Support:** Google OAuth + Email/OTP Registration.
* **Album Management:** Create, delete, and share albums with custom permissions.
* **Media Handling:** Upload images with metadata, tag support, and favorite markers.
* **Collaboration:** Share albums with others via email.
* **Security:** JWT-based protection for all private routes and middleware-driven permission checks.

---

## 🧠 Core Logic

* **Authentication Flow:** The system validates users via either the Google callback strategy or the OTP verification service before issuing a JWT.
* **Permissions:** Middleware ensures that only the **album owner** has write/delete access, while shared users are restricted to "view-only" access.
* **Secure Uploads:** Multer handles local file validation (type/size) before streaming the image to ImageKit. Metadata is persisted in MongoDB.

---

## 📁 Project Structure

```text
kaviosPix/
├── src/
│   ├── config/       # Configuration (DB, ImageKit, Passport, Brevo)
│   ├── controllers/  # Auth, Album, and Image logic
│   ├── middleware/   # Auth, Upload, and Permissions
│   ├── models/       # MongoDB Schemas
│   └── routes/       # API Endpoints
├── app.js
├── server.js
└── package.json

👨‍💻 Author
Shiv Kumar GitHub: shiv-11013

Email: shivkumar121112@gmail.com