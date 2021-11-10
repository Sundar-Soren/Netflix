const express = require("express");
const {
  isAuthenticated,
  getUserDetails,
} = require("../controllers/authControllers");
const router = express.Router();

router.route("/me").get(isAuthenticated, getUserDetails);

module.exports = router;
