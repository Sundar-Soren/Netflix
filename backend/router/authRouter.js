const express = require("express");
const {
  register,
  login,
  userLogout,
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.route("/logout").get(userLogout);

module.exports = router;
