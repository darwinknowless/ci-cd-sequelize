const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Package to enable soft delete

const PelangganSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
      required: false,
      // Getter
      get: getPhoto,
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
function getPhoto(photo) {
  return `/images/${photo}`;
}

// Enable soft delete
PelangganSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("pelanggan", PelangganSchema, "pelanggan"); // Export model
