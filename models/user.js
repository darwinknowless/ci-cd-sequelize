const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Package to enable soft delete
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // fungsi set : sebelum data disimpan, data di encrypt,dll
      set: encryptPassword,
    },
    role: {
      type: String,
      default: "admin",
      //enum: ["user","admin"], //=>> lock who can use role.
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

function encryptPassword(password) {
  const encryptPassword = bcrypt.hashSync(password, 10);
  return encryptPassword;
}

// Enable soft delete
UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("user", UserSchema); // Export model
