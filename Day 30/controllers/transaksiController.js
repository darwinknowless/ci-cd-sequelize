const { barang, pelanggan, pemasok, transaksi } = require("../models");

class TransaksiController {
  //Get all data
  async getAll(req, res) {
    try {
      // Get all data
      let data = await transaksi.find();
      // If no data
      if (data.length === 0) {
        return res.status(404).json({
          message: "Transaksi Not Found",
        });
      }
      // If success
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

  //Get One
  async getOne(req, res) {
    try {
      // Find one data
      let data = await transaksi.findOne({ _id: req.params.id });
      // If data not found
      if (!data) {
        return res.status(404).json({
          message: "Transaksi Not Found",
        });
      }
      // If success
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

  //Create
  async create(req, res) {
    try {
      //Create data
      let data = await transaksi.create(req.body);
      // Or using this
      // let data = await transaksi.create({
      //   barang: findData[0],
      //   pelanggan: findData[1],
      //   jumlah: req.body.jumlah,
      //   total,
      // });
      //if success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
  //Update
  async update(req, res) {
    try {
      // Update data
      let data = await transaksi.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );
      // new is to return the updated transaksi data
      // If no new, it will return the old data before updated

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

  //Delete
  async delete(req, res) {
    try {
      //delete data
      await transaksi.delete({ _id: req.params.id });

      return res.status(200).json({
        message: "Success",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
}

module.exports = new TransaksiController();
