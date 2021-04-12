const express = require("express");

// Import controller
const pelangganController = require("../controllers/pelangganController");

// Import auth (middleware)
const auth = require("../middlewares/auth");

// Make router
const router = express.Router();

router.route("/").get(pelangganController.getAll);

module.exports = router;
