const {
  validateLogin,
  loginvalidationRules,
} = require("../middleware/validation");
const { handleUserLogin } = require("../controllers/loginController");
const express = require("express");
const login = express.Router();

login.post(
  "/api/v1/login",
  validateLogin,
  loginvalidationRules(),
  handleUserLogin
);

module.exports = { login };
