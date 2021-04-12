const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import middlewares
const barangValidator = require("../middlewares/validators/barangValidator");

// Import controller
const barangController = require("../controllers/barangController");

router.get("/", barangController.getAll);

// If POST (/barang)
// Then, go to transaksiValidator.create
// If in the transaksiValidator.create can run the next(), it will go to transaksiController.create
router.post("/", barangValidator.create, barangController.create);

module.exports = router; // Export router
