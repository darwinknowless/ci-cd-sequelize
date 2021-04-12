const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const validator = require("validator");
const { barang, pelanggan, pemasok, transaksi } = require("../../models");

exports.create = async (req, res, next) => {
  try {
    // Initialita
    let errors = [];

    // Check id_pemasok
    if (!mongoose.Types.ObjectId.isValid(req.body.id_pemasok)) {
      errors.push(
        "id_pemasok is not valid and must be 24 character & hexadecimal"
      );
    }

    // If params error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    let findData = await Promise.all([
      barang.findOne({ nama: req.body.nama }),
      pemasok.findOne({ _id: req.body.id_pemasok }),
    ]);

    // If data barang is exist
    if (findData[0]) {
      errors.push("Nama barang exists");
    }

    // If data pemasok not found
    if (!findData[1]) {
      errors.push("Pemasok not found");
    }

    // Check harga is number
    if (!validator.isNumeric(req.body.harga)) {
      errors.push("Harga must be a number");
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // If image was uploaded
    if (req.files) {
      const file = req.files.image;

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        errors.push("File must be an image");
      }

      // Check file size (max 1MB)
      if (file.size > 1000000) {
        errors.push("Image must be less than 1MB");
      }

      // Create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      // Rename the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      // assign req.body.image with file.name
      req.body.image = file.name;

      // Upload image to /public/images
      file.mv(`./public/images/${file.name}`, async (err) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
          });
        }
      });
    }

    req.body.pemasok = req.body.id_pemasok;

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
