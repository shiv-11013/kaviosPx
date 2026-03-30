const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
