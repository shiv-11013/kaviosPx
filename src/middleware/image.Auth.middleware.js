const imageModel = require("../models/image.model");
const albumModel = require("../models/album.model");

async function verifyImageAccess(req, res, next) {
  try {
    const { imageId, albumId } = req.params;

    const image = await imageModel.findOne({ imageId });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (image.albumId !== albumId) {
      return res
        .status(400)
        .json({ message: "Invalid albumId for this image" });
    }

    const album = await albumModel.findOne({ albumId });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.ownerId !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    req.image = image;
    req.album = album;

    next();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error verifying image access",
    });
  }
}

module.exports = {
  verifyImageAccess,
};
