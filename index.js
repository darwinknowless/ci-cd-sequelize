require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
// Express
const express = require("express");
const fileUpload = require("express-fileupload"); // Import express-fileupload

// Import router
const authRoutes = require("./routes/authRoutes");
const barangRoutes = require("./routes/barangRoutes");
const pelangganRoutes = require("./routes/pelangganRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");

// Make app
const app = express();

// Body parser
app.use(express.json()); // Enable json req.body
app.use(
  express.urlencoded({
    extended: true,
  })
); // Enable req.body urlencoded

// To read form-data
app.use(fileUpload());

// Static folder (for images)
app.use(express.static("public"));

// Make routes
app.use("/auth", authRoutes);
app.use("/barang", barangRoutes);
// app.use("/pemasok", pemasokRoutes);
app.use("/pelanggan", pelangganRoutes);
app.use("/transaksi", transaksiRoutes);

// If environment is not test
if (process.env.NODE_ENV !== "test") {
  // Running server
  let PORT = 3000 || process.env.PORT;
  app.listen(PORT, () => console.log(`Server running on ${PORT}!`));
}
// Running server
// let PORT = 3000 || process.env.PORT;
// app.listen(PORT, () => console.log(`Server running on ${PORT}!`));
module.exports = app;