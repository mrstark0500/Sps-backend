const express = require("express");
const staffController = require("../controllers/staff.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// ================= CREATE STAFF =================
router.post(
  "/",
  authMiddleware,
  upload.single("image"), // 👈 correct
  staffController.createStaff
);

// ================= GET ALL STAFF =================
router.get(
  "/",
  staffController.getStaff
);

// ================= DELETE STAFF ================= ✅ ADD THIS
router.delete(
  "/:id",
  authMiddleware,
  staffController.deleteStaff
);

module.exports = router;
