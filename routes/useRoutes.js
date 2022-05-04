const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

///rotes for

router.route("/signup").post(userControllers.signUp);
router.route("/login").post(userControllers.signin);

module.exports = router;
