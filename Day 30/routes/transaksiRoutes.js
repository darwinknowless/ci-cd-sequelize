const express = require("express");

// Import validator
const transaksiValidator = require("../middlewares/validators/transaksiValidator");

// Import controller
const transaksiController = require("../controllers/transaksiController");

// Import auth (middleware)
const auth = require("../middlewares/auth");

// Make router
const router = express.Router();

//TODO: Grouping Routes (see below)
router
  .route("/")
  .get(auth.adminOrUser, transaksiController.getAll)
  .post(auth.admin, transaksiValidator.create, transaksiController.create);

router
  .route("/:id")
  .get(auth.adminOrUser, transaksiValidator.getOne, transaksiController.getOne)
  .put(auth.admin, transaksiValidator.update, transaksiController.update)
  .delete(auth.admin, transaksiValidator.delete, transaksiController.delete);

//TODO: One by One Routes (see below)
// // Get all transaksi
// router.get(
//     "/",
//     auth.admin,
//     transaksiController.getAll
//     );
// // Get one transaksi
// router.get(
//     "/:id",
//     auth.user,
//     transaksiValidator.getOne,
//     transaksiController.getOne
//     );
// // Create transaksi
// router.post(
//     "/",
//     transaksiValidator.create,
//     transaksiController.create
//     );
// // Update transaksi
// router.put(
//     "/:id",
//     transaksiValidator.update,
//     transaksiController.update
//     );
// // Delete transaksi
// router.delete(
//     "/:id",
//     transaksiValidator.delete,
//     transaksiController.delete
//     );

module.exports = router;
