const express = require("express"); // Import express
const passport = require("passport"); // Import passport

// Import validator
const authValidator = require("../middlewares/validators/authValidator");

// Import controller
const authController = require("../controllers/authController");

// Import auth (middleware)
const auth = require("../middlewares/auth");

// Make router
const router = express.Router();

// If user access /auth/signup (POST)
router.post(
  "/signup",
  authValidator.signup,
  auth.signup,
  authController.getToken
);

// If user access /auth/signin (POST)
router.post(
  "/signin",
  authValidator.signin,
  auth.signin, 
  authController.getToken
);

module.exports = router;
