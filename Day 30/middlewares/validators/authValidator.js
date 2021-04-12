const validator = require("validator");

//TODO: Eksport Sign Up
exports.signup = async (req, res, next) => {
  try {
    let errors = [];
    //? Check req.body.email is email
    if (!validator.isEmail(req.body.email)) {
      errors.push("Email field must be valid email");
    }
    //? Check password strong
    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password needs (uppercase & lowercase characters, number, and symbol)"
      );
    }
    //? Check passwordConfirmation
    if (req.body.confirmPassword !== req.body.password) {
      errors.push("Password confirmation must be same to password");
    }
    //! If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

//TODO: Eksport Sign In
exports.signin = async (req, res, next) => {
  try {
    let errors = [];
    //? Check req.body.email is email
    if (!validator.isEmail(req.body.email)) {
      errors.push("Email field must be valid email");
    }
    //? Check password strong
    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password needs (uppercase & lowercase characters, number, and symbol)"
      );
    }
    //! If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};
