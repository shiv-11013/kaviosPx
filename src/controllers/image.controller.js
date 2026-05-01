const imageModel = require("../models/image.model");
const imagekit = require("../config/imagekit");
const albumModel = require("../models/album.model");

async function uploadImageController(req, res) {
  try {
    const { albumId } = req.params;
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    // Save to DB
    const newImage = await imageModel.create({
      albumId,
      imagekitFileId: result.fileId,
      name: req.file.originalname,
      url: result.url,
      size: req.file.size,
    });

    res.status(201).json({ image: newImage });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
}

async function toggleFavoriteController(req, res) {
  try {
    const image = req.image;
    image.isFavorite = !image.isFavorite;
    await image.save();
    res
      .status(200)
      .json({ message: "Favorite updated", isFavorite: image.isFavorite });
  } catch (err) {
    res.status(500).json({ message: "Error updating favorite" });
  }
}

async function addCommentController(req, res) {
  try {
    const { comment } = req.body;
    const image = req.image;
    image.comments.push(comment);
    await image.save();
    res
      .status(200)
      .json({ message: "Comment added", comments: image.comments });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
}

async function deleteImageController(req, res) {
  try {
    const image = req.image;
    await imagekit.deleteFile(image.imagekitFileId);
    await image.deleteOne();
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting image" });
  }
}

async function getImagesController(req, res) {
  try {
    const { albumId } = req.params;
    const album = await albumModel.findOne({ albumId });
    if (!album) return res.status(404).json({ message: "Album not found" });
    if (album.ownerId !== req.user.userId)
      return res.status(403).json({ message: "Not allowed" });

    const images = await imageModel.find({ albumId });
    res.status(200).json({ images: images });
  } catch (err) {
    res.status(500).json({ message: "Error fetching images" });
  }
}

module.exports = {
  uploadImageController,
  toggleFavoriteController,
  addCommentController,
  deleteImageController,
  getImagesController,
};
