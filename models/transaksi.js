const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete

const TransaksiSchema = new mongoose.Schema(
  {
    barang: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    pelanggan: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// Enable soft delete
TransaksiSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("transaksi", TransaksiSchema, "transaksi"); // Export model
