const express = require("express");
const governingController = require('./../controllers/governing.controller');
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// CREATE STAFF
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  governingController.createStaff
);

// GET ALL STAFF
router.get(
  "/",
  governingController.getStaff
);

// ✅ DELETE STAFF
router.delete(
  "/:id",
  authMiddleware,
  governingController.deleteStaff
);

module.exports = router;
