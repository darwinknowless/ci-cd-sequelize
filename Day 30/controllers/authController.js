const jwt = require("jsonwebtoken"); // import jsonwebtoken

class AuthController {
  // If user login/Signup
  async getToken(req, res) {
    try {
      // Get the req.user that has been created in the authRoutes
      // And create body variable
      const body = {
        user: {
          id: req.user._id,
        }
      }

      // Create jwt token with { user: { id: req.user._id } } value
      // And the key is process.env.JWT_SECRET
      const token = jwt.sign(body, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      // If success
      return res.status(200).json({
        message: "Success",
        token,
      });
    } catch (e) {
      // If error
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new AuthController();
