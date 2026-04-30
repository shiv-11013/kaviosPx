const imageModel = require("../models/image.model");
const imagekit = require("../config/imagekit");

async function toggleFavoriteController(req, res) {
  try {
    const image = req.image;

    image.isFavorite = !image.isFavorite;

    await image.save();

    res.status(200).json({
      message: "Favorite updated",
      isFavorite: image.isFavorite,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error updating favorite",
    });
  }
}

async function addCommentController(req, res) {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment required" });
    }

    const image = req.image;

    image.comments.push(comment);
    await image.save();

    res.status(200).json({
      message: "Comment added",
      comments: image.comments,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error adding comment",
    });
  }
}

async function deleteImageController(req, res) {
  try {
    const image = req.image;

    await imagekit.deleteFile(image.imageId);

    await image.deleteOne();

    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error deleting image",
    });
  }
}

async function getFavoriteImagesController(req, res) {
  try {
    const { albumId } = req.params;

    const images = await imageModel.find({
      albumId,
      isFavorite: true,
    });

    res.status(200).json({
      images: images,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching favorite images",
    });
  }
}

async function getImagesController(req, res) {
  try {
    const { albumId } = req.params;
    const { tags } = req.query;

    const album = await albumModel.findOne({ albumId });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.ownerId !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    let filter = { albumId };
    if (tags) {
      filter.tags = { $in: [tags] };
    }

    const images = await imageModel.find(filter);

    res.status(200).json({
      images: images,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching images",
    });
  }
}

module.exports = {
  toggleFavoriteController,
  addCommentController,
  deleteImageController,
  getImagesController,
  getFavoriteImagesController,
};
