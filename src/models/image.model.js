const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const imageSchema = new mongoose.Schema(
  {
    imageId: {
      type: String,
      default: uuidv4,
    },
    albumId: {
      type: String,
      required: true, // kis album se linked hai
    },
    name: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    person: {
      type: String, // optional
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: String,
      },
    ],
    size: {
      type: Number, // bytes / kb / mb (tu decide kar)
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Image", imageSchema);
