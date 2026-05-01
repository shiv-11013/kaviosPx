const express = require("express");
const multer = require("multer");
const { verifyImageAccess } = require("../middleware/image.Auth.middleware");
const imageController = require("../controllers/image.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload Route (With Multer Middleware)
router.post(
  "/:albumId", 
  authMiddleware, 
  upload.single("image"), 
  imageController.uploadImageController
);

// Get Images
router.get("/:albumId", authMiddleware, imageController.getImagesController);

// Toggle Favorite
router.put(
  "/:albumId/:imageId/favorite",
  authMiddleware,
  verifyImageAccess,
  imageController.toggleFavoriteController
);

// Add Comment
router.post(
  "/:albumId/:imageId/comments",
  authMiddleware,
  verifyImageAccess,
  imageController.addCommentController
);

// Delete Image
router.delete(
  "/:albumId/:imageId",
  authMiddleware,
  verifyImageAccess,
  imageController.deleteImageController
);

module.exports = router;