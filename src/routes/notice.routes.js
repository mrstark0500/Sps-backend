// routes/notice.routes.js
const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/notice.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Admin upload
router.post("/", authMiddleware, upload.single("file"), noticeController.uploadNotice);

// Get all notices
router.get("/", noticeController.getNotices);

// Admin delete
router.delete("/:id", authMiddleware, noticeController.deleteNotice);

module.exports = router;
