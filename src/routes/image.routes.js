const express = require("express");
const { verifyImageAccess }  = require("../middleware/image.Auth.middleware");
const imageController = require("../controllers/image.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.put(
  "/:albumId/images/:imageId/favorite",
  authMiddleware,
  verifyImageAccess,
  imageController.toggleFavoriteController,
);

router.post(
  "/:albumId/images/:imageId/comments",
  authMiddleware,
  verifyImageAccess,
  imageController.addCommentController,
);

router.delete(
  "/:albumId/images/:imageId",
  authMiddleware,
  verifyImageAccess,
  imageController.deleteImageController,
);

router.get(
  "/:albumId/images",
  authMiddleware,
  imageController.getImagesController,
);

router.get(
  "/:albumId/images/favorites",
  authMiddleware,
  imageController.getFavoriteImagesController,
);

module.exports = router;
