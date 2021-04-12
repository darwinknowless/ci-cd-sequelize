const { barang, pelanggan, pemasok, transaksi } = require("../models");

class BarangController {
  async getAll(req, res) {
    try {
      let data = await barang.find().populate("pemasok");

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }

  async create(req, res) {
    try {
      // Create barang data
      let createdData = await barang.create(req.body);

      // find created data and join with pemasok
      let data = await barang
        .findOne({ _id: createdData._id })
        .populate("pemasok");

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
}

module.exports = new BarangController();
