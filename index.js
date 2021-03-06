require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
// Express
const fs = require("fs"); //==>> Add this in index.js
const path = require("path"); //==>> Add this in index.js
const express = require("express");
const fileUpload = require("express-fileupload"); // Import express-fileupload

//TODO Security package
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

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

//TODO Add security
// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

// Static folder (for images)
app.use(express.static("public"));

// Make routes
app.use("/auth", authRoutes);
app.use("/barang", barangRoutes);
app.use("/pelanggan", pelangganRoutes);
app.use("/transaksi", transaksiRoutes);
// app.use("/pemasok", pemasokRoutes);

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