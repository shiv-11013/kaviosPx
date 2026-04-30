const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const imageSchema = new mongoose.Schema(
  {
    imageId: {
      type: String,
      default: uuidv4, 
    },

    imagekitFileId: {
      type: String,
      required: true, 
    },

    albumId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    tags: [String],
    person: String,

    isFavorite: {
      type: Boolean,
      default: false,
    },

    comments: [String],

    size: Number,

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Image", imageSchema);