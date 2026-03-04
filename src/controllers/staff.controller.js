const staffModel = require("../models/staff.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

// ================= CREATE STAFF =================
async function createStaff(req, res) {
  try {
    console.log("Admin ID from token:", req.adminId);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const {
      name,
      role,
      qualification,
      experience,
      email,
      department,
    } = req.body;

    if (!name || !role || !email) {
      return res.status(400).json({
        message: "Name, role and email are required",
      });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const staff = await staffModel.create({
      name,
      role,
      qualification,
      experience,
      email,
      image: fileUploadResult.url,
      department,
      createdBy: req.adminId,
    });

    res.status(201).json({
      message: "Staff created successfully",
      staff,
    });
  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json({
      message: "Failed to create staff",
    });
  }
}

// ================= GET STAFF =================
async function getStaff(req, res) {
  try {
    const filter = {};

    if (req.query.department) {
      filter.department = req.query.department;
    }

    const staff = await staffModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Staff members fetched successfully",
      total: staff.length,
      staff,
    });
  } catch (error) {
    console.error("Get staff error:", error);
    res.status(500).json({
      message: "Failed to fetch staff",
    });
  }
}

// ================= DELETE STAFF =================
async function deleteStaff(req, res) {
  try {
    const { id } = req.params;

    const staff = await staffModel.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.status(200).json({
      message: "Staff deleted successfully",
    });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({
      message: "Failed to delete staff",
    });
  }
}

module.exports = {
  createStaff,
  getStaff,
  deleteStaff, // ✅ IMPORTANT
};
