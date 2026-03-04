const express = require("express");
const imageController = require("../controllers/image.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

/* ================= CREATE IMAGE ================= */
router.post(
  "/",
  authMiddleware,
  upload.single("image"), // field name must be "image"
  imageController.createImage
);

/* ================= GET IMAGES ================= */
router.get(
  "/",
  imageController.getImage
);

/* ================= DELETE IMAGE ================= */
router.delete(
  "/:id",
  authMiddleware,
  imageController.deleteImage
);

module.exports = router;
