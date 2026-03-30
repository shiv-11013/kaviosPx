const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const albumSchema = new mongoose.Schema(
  {
    albumId: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    sharedWith: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Album", albumSchema);
