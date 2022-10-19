// IMPORT PACKAGE
const express = require("express");

// USE THE ROUTER FUNCTION OF EXPRESS MODULE
const router = express.Router();

// IMPORT EMAIL MIDDLEWARE
const email = require("../middleware/email");

// IMPORT PASSWORD MIDDLEWARE
const password = require("../middleware/password");

// IMPORT USER CONTROLLER
const userCtrl = require("../controllers/user");

// USER ROUTES
/**
 * For the user signup:
 *  - Call the email validation,
 *  - then the password validation,
 *  - if everything is ok with the validations:
 *      - call the signup function in the user controller.
 *  - else:
 *      - each middleware return an error message.
 * For the user login:
 *  - Call the login function in the user controller
 */
router.post("/signup", email, password, userCtrl.signup);
router.post("/login", userCtrl.login);

// EXPORT USER ROUTES
module.exports = router;
