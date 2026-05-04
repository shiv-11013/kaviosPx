const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uuidv4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email address",
      ],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
