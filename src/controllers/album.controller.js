const albumModel = require("../models/album.model");
const userModel = require("../models/user.model");
const imageModel = require("../models/image.model");
const imagekit = require("../config/imagekit");
async function createAlbumController(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const album = await albumModel.create({
      name: name,
      description: description,
      ownerId: req.user.userId,
    });

    res.status(201).json({
      message: "Album created",
      album: album,
    });
  } catch (err) {
    console.log("Album Error:", err.message);
    res.status(500).json({
      message: "Error creating album",
    });
  }
}

async function getAlbumController(req, res) {
  try {
    const ownerId = req.user.userId;

    // user email

    const albums = await albumModel.find({
      $or: [{ ownerId: ownerId }, { sharedWith: req.user.email }],
    });
    res.status(200).json({
      albums: albums,
    });
  } catch (err) {
    console.log("Getting Album error", err.message);
    res.status(500).json({
      message: "Error fetching albums",
    });
  }
}

async function updateAlbumController(req, res) {
  try {
    const ownerId = req.user.userId;
    const { description } = req.body;

    const album = await albumModel.findOne({ albumId: req.params.albumId });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.ownerId !== ownerId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    album.description = description;
    await album.save();

    res.status(200).json({
      message: "Album updated",
      album: album,
    });
  } catch (err) {
    console.log("Updating error", err.message);
    res.status(500).json({ message: "Error updating album" });
  }
}

async function shareEmailController(req, res) {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({
        message: "Emails must be an array",
      });
    }

    const album = await albumModel.findOne({ albumId: req.params.albumId });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.ownerId !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const users = await userModel.find({
      email: { $in: emails },
    });

    const validEmails = users.map((user) => user.email);

    for (let i = 0; i < validEmails.length; i++) {
      const email = validEmails[i];

      if (!album.sharedWith.includes(email) && email !== req.user.email) {
        album.sharedWith.push(email);
      }
    }

    await album.save();
    res.status(200).json({
      message: "Album shared",
      sharedWith: album.sharedWith,
    });
  } catch (err) {
    console.log("Share Email Error", err.message);
    res.status(500).json({ message: "Error sharing album" });
  }
}

async function deleteAlbumController(req, res) {
  try {
    const album = await albumModel.findOne({ albumId: req.params.albumId });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.ownerId !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await imageModel.deleteMany({ albumId: album.albumId });
    await album.deleteOne();

    res.status(200).json({
      message: "Album Images also deleted",
    });
  } catch (err) {
    console.log("Delete Album Error", err.message);
    res.status(500).json({ message: "Error deleting album" });
  }
}

async function uploadImageController(req, res) {
  try {
    const file = req.file;
    const { tags, person, isFavorite } = req.body;
    const albumId = req.params.albumId;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const album = await albumModel.findOne({ albumId });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (
      album.ownerId !== req.user.userId &&
      !album.sharedWith.includes(req.user.email)
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: `albums/${albumId}`,
    });

    const image = await imageModel.create({
      imageId: response.fileId,
      albumId: albumId,
      name: file.originalname,
      size: file.size,
      url: response.url,
      tags: tags || [],
      person: person || "",
      isFavorite: isFavorite === "true",
      comments: [],
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      image: image,
    });
  } catch (err) {
    console.log("Error while uploading image to Imagekit", err.message);
    res.status(500).json({
      message: "Error uploading image",
    });
  }
}
module.exports = {
  createAlbumController,
  getAlbumController,
  updateAlbumController,
  shareEmailController,
  deleteAlbumController,
  uploadImageController,
};
