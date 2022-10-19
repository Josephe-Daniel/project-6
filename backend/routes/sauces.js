// IMPORT PACKAGES
const express = require("express");
const router = express.Router();

// IMPORT AUTHENTICATION MIDDLEWARE
const auth = require("../middleware/auth");

// IMPORT MULTER CONFIGURATION MIDDLEWARE
const multer = require("../middleware/multer-config");

// IMPORT SAUCES CONTROLLER
const saucesCtrl = require("../controllers/sauces");

// SAUCES ROUTES
/**
 * pass the authentication middleware as an argument,
 * in order to protect "sauce" roads.
 * For the "createSauce" and "modifySauce" pass the multer middleware,
 * for handling the incoming images.
 * then pass the "sauces" controllers for each route.
 */
router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, multer, saucesCtrl.likeSauce);

// EXPORT SAUCES ROUTES
module.exports = router;
