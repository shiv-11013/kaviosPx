const express = require("express");

const albumController = require("../controllers/album.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

router.post("/", authMiddleware, albumController.createAlbumController);

router.get("/", authMiddleware, albumController.getAlbumController);

router.put("/:albumId", authMiddleware, albumController.updateAlbumController);

router.post(
  "/:albumId/share",
  authMiddleware,
  albumController.shareEmailController,
);

router.delete("/:albumId", authMiddleware, albumController.deleteAlbumController);

router.post(
  "/:albumId/images",
  authMiddleware,
  upload.single("image"),
  albumController.uploadImageController,
);
module.exports = router;
