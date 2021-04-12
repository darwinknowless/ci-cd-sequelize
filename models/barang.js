const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Package to enable soft delete

const BarangSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      unique: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    pemasok: {
      type: mongoose.Schema.ObjectId,
      ref: "pemasok",
      required: true,
    },
    image: {
      type: String,
      default: null,
      required: false,
      // Getter
      get: getImage,
    },
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true }, 
  }
);

// Image getter
function getImage(image) {
  return `/images/${image}`;
}

// Enable soft delete
BarangSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("barang", BarangSchema, "barang"); // Export model
