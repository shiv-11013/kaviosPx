# 📷 KaviosPix

KaviosPix is an image management backend API.  
It is inspired by Google Photos type system but only backend side.

User can login using Google, create albums, upload images and manage them.

Main focus of this project was to implement real backend concepts like auth, permissions and file handling.

---

## 🚀 Live API

https://kaviospx.onrender.com

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- JWT
- Multer
- ImageKit

---

## 📁 Project Structure (basic idea)

kaviosPix/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── imagekit.js
│   │   └── passport.js
│   ├── controllers/
│   │   ├── album.controller.js
│   │   ├── auth.controller.js
│   │   └── image.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── image.Auth.middle.js
│   │   └── upload.middleware.js
│   ├── models/
│   │   ├── album.model.js
│   │   ├── image.model.js
│   │   └── user.model.js
│   └── routes/
│       ├── album.routes.js
│       ├── auth.routes.js
│       └── image.routes.js
├── .env
├── app.js
├── server.js
└── package.json

---

## 🔐 Auth Flow (how it works)

- User hits `/api/auth/google`
- Redirect to Google login
- After login, callback comes
- User is saved or fetched from DB
- JWT token is generated
- Token is used in protected routes

---

## 📦 Features

- Google login + JWT auth
- Create / delete / share albums
- Upload images with tags
- Mark images as favorite
- Add comments on images
- Share album using email

---

## 🧠 Important Logic

### Album Permission
- Only owner can update or delete album
- Shared users can only view
- This is checked in middleware

### Image Upload
- Multer checks file type and size
- Image is uploaded to ImageKit
- Metadata is stored in DB

### Auth
- JWT based system
- Every protected route checks token

---

## ⚠️ Problems I faced

- Google OAuth callback debugging
- Handling album sharing permissions correctly
- File upload error handling

---

## ❌ Limitations

- No pagination in images
- No refresh token system
- No rate limiting
- No proper logging

---

## ▶️ Run locally

```bash
git clone https://github.com/shiv-11013/kaviosPx.git
cd kaviosPix
npm install
npm run dev

Create a .env file in root folder:

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint


## 👨‍💻 Author

Name: Shiv Kumar  
GitHub: https://github.com/shiv-11013  
Email: shivkumar121112@gmail.com