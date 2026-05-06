# 📷 KaviosPix

# 📷 KaviosPix

KaviosPix is a backend-focused image management system built with Node.js, Express and MongoDB.

It supports Google OAuth, JWT authentication, OTP verification, album permissions, image uploads and image sharing features.

The main goal of this project was to practice real backend engineering concepts such as authentication flows, authorization, file handling, middleware design and production deployment.

---

## 🚀 Live API

https://kaviospx.onrender.com

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Google OAuth (Passport.js)
- JWT Authentication
- Multer (file upload)
- ImageKit (image storage)
- Bcrypt (password hashing)
- Brevo API (OTP email delivery)

---

## 📁 Project Structure (basic idea)

```
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
│   │   ├── otp.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── album.routes.js
│   │   ├── auth.routes.js
│   │   └── image.routes.js
│   └── services/
│       └── email.service.js
├── app.js
├── server.js
└── package.json
```

---

## 🔐 Auth Flow (how it works)

### Google OAuth

- User hits `/api/auth/google`
- Redirect to Google login
- After login, callback comes
- User is saved or fetched from DB
- JWT token is generated
- Token is used in protected routes

### Email/Password

- User registers at `/api/auth/register`
- Password is hashed using bcrypt
- JWT token is returned
- User logs in at `/api/auth/login`

### OTP Verification

- User sends email to `/api/auth/send-otp`
- OTP is sent via Brevo (valid for 5 minutes)
- User verifies at `/api/auth/verify-otp`
- JWT token is returned on success

---

## 📦 Features

- Google login + JWT auth
- Email/Password register + login
- OTP email verification (Brevo)
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
- Both Google OAuth and Email/Password supported

### OTP Flow

- OTP is hashed with bcrypt before saving to DB
- OTP expires after 5 minutes
- OTP is deleted from DB after successful verification

---

## 📡 API Endpoints

### Auth

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | `/api/auth/google`          | Google OAuth login      |
| GET    | `/api/auth/google/callback` | Google callback         |
| POST   | `/api/auth/register`        | Email/password register |
| POST   | `/api/auth/login`           | Email/password login    |
| POST   | `/api/auth/send-otp`        | Send OTP email          |
| POST   | `/api/auth/verify-otp`      | Verify OTP              |

### Albums

| Method | Endpoint                     | Description        |
| ------ | ---------------------------- | ------------------ |
| POST   | `/api/albums`                | Create album       |
| GET    | `/api/albums`                | Get all albums     |
| PUT    | `/api/albums/:albumId`       | Update description |
| POST   | `/api/albums/:albumId/share` | Share album        |
| DELETE | `/api/albums/:albumId`       | Delete album       |

### Images

| Method | Endpoint                                        | Description     |
| ------ | ----------------------------------------------- | --------------- |
| POST   | `/api/albums/:albumId/images`                   | Upload image    |
| GET    | `/api/albums/:albumId/images`                   | Get all images  |
| GET    | `/api/albums/:albumId/images/favorites`         | Get favorites   |
| PUT    | `/api/albums/:albumId/images/:imageId/favorite` | Toggle favorite |
| POST   | `/api/albums/:albumId/images/:imageId/comments` | Add comment     |
| DELETE | `/api/albums/:albumId/images/:imageId`          | Delete image    |

---

## ⚠️ Problems I faced

- Fixing CORS issues between Vercel frontend and Render backend during production deployment
- Handling Google OAuth callback flow and frontend token redirection properly
- Designing album permission logic so shared users could only view but not modify albums
- Managing OTP verification flow with expiry handling and bcrypt hashing
- Preventing duplicate OTP entries and cleaning expired OTP records
- Handling multipart image uploads and validating file size/type safely
- Debugging async issues and deployment mismatches between local and production environments

---

## ❌ Limitations

- No pagination in images
- No refresh token system
- No rate limiting
- No proper logging

---

## ▶️ Run locally

```bash
git clone https://github.com/shiv-11013/kaviosPx
cd kaviosPix
npm install
npm run dev
```

Create a `.env` file in root folder:

```
PORT=5000
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
FRONTEND_URL=
BREVO_API_KEY=
EMAIL_USER=
NODE_ENV=development
```

---

## 👨‍💻 Author

Name: Shiv Kumar  
GitHub: https://github.com/shiv-11013  
Email: shivkumar121112@gmail.com
