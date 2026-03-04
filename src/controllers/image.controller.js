const ImageModel = require("./../models/image.model");
const storageService = require("./../services/storage.service");
const { v4: uuid } = require("uuid");

/* ================= CREATE IMAGE ================= */
async function createImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name, year } = req.body;

    if (!name || !year) {
      return res.status(400).json({
        message: "Name and year are required"
      });
    }

    // upload to cloud / storage
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const image = await ImageModel.create({
      name,
      year,
      image: fileUploadResult.url
    });

    res.status(201).json({
      message: "Image created successfully",
      image
    });

  } catch (error) {
    console.error("Create image error:", error);
    res.status(500).json({
      message: "Failed to create image"
    });
  }
}

/* ================= GET IMAGES ================= */
async function getImage(req, res) {
  try {
    const filter = {};

    // optional year filter
    if (req.query.year) {
      filter.year = req.query.year;
    }

    const images = await ImageModel
      .find(filter)
      .sort({ year: -1, createdAt: -1 });

    res.status(200).json({
      message: "Images fetched successfully",
      total: images.length,
      images
    });

  } catch (error) {
    console.error("Get image error:", error);
    res.status(500).json({
      message: "Failed to fetch images"
    });
  }
}

/* ================= DELETE IMAGE ================= */
async function deleteImage(req, res) {
  try {
    const { id } = req.params;

    const image = await ImageModel.findById(id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found"
      });
    }

    // OPTIONAL: delete from cloud/storage
    // If your storageService supports delete
    if (image.image) {
      try {
        await storageService.deleteFile(image.image);
      } catch (err) {
        console.warn("Cloud delete skipped:", err.message);
      }
    }

    await ImageModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Image deleted successfully"
    });

  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({
      message: "Failed to delete image"
    });
  }
}

module.exports = {
  createImage,
  getImage,
  deleteImage
};
