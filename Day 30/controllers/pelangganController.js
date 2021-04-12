const { barang, pelanggan, pemasok, transaksi } = require("../models");

class PelangganController {
  async getAll(req, res) {
    try {
      let data = await pelanggan.find();

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
}

module.exports = new PelangganController();
