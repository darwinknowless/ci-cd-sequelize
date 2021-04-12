const mongoose = require("mongoose");
const validator = require("validator");
const { barang, pelanggan, pemasok, transaksi } = require("../../models");

exports.getOne = (req, res, next) => {
  try {
    // Check parameter is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message:
          "Parameter is not valid and must be 24 character & hexadecimal",
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    let errors = [];

    // Check id_barang is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.body.id_barang)) {
      errors.push(
        "id_barang is not valid and must be 24 character & hexadecimal"
      );
    }

    // Check id_pelanggan is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.body.id_pelanggan)) {
      errors.push(
        "id_pelanggan is not valid and must be 24 character & hexadecimal"
      );
    }

    // If the parameters is not valid it will go here
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // Find barang and pelanggan
    let findData = await Promise.all([
      barang.findOne({ _id: req.body.id_barang }),
      pelanggan.findOne({ _id: req.body.id_pelanggan }),
    ]);

    // if barang not found
    if (!findData[0]) {
      errors.push("Barang not found");
    }

    // if pelanggan not found
    if (!findData[1]) {
      errors.push("Pelanggan not found");
    }

    // Check is jumlah numeric?
    if (!validator.isNumeric(req.body.jumlah)) {
      errors.push("Jumlah must be a number");
    }

    // If errors
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // Calculate total
    req.body.barang = findData[0];
    req.body.pelanggan = findData[1];
    req.body.total = eval(findData[0].harga * req.body.jumlah);

    // Go to next
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    let errors = [];

    // Check parameter id is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "id_transaksi is not valid and must be 24 character & hexadecimal"
      );
    }

    // Check id_barang is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.body.id_barang)) {
      errors.push(
        "id_barang is not valid and must be 24 character & hexadecimal"
      );
    }

    // Check id_pelanggan is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.body.id_pelanggan)) {
      errors.push(
        "id_pelanggan is not valid and must be 24 character & hexadecimal"
      );
    }

    // If the parameters is not valid it will go here
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // Find barang, pelanggan and transaksi
    let findData = await Promise.all([
      barang.findOne({ _id: req.body.id_barang }),
      pelanggan.findOne({ _id: req.body.id_pelanggan }),
      transaksi.findOne({ _id: req.params.id }),
    ]);

    // if barang not found
    if (!findData[0]) {
      errors.push("Barang not found");
    }

    // If pelanggan not found
    if (!findData[1]) {
      errors.push("Pelanggan not found");
    }

    // If transaksi not found
    if (!findData[2]) {
      errors.push("Transaksi not found");
    }

    // Check jumlah is numeric
    if (!validator.isNumeric(req.body.jumlah)) {
      errors.push("Jumlah must be a number");
    }

    // If error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // Calculate total
    req.body.barang = findData[0];
    req.body.pelanggan = findData[1];
    req.body.total = eval(findData[0].harga * req.body.jumlah);

    // Go to next
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    let errors = [];

    // Check params is valid or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push(
        "id_transaksi is not valid and must be 24 character & hexadecimal"
      );
    }

    // If params error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // Find one transaksi
    let data = await transaksi.findOne({ _id: req.params.id });

    // If transaksi not found
    if (!data) {
      errors.push("Transaksi not found");
    }

    // If error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // Go to next
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
