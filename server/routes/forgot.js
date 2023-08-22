const express = require('express');
const { handleForgotPass } = require('../controllers/passContoller');
const forgotPass = express.Router();

forgotPass.post("/api/v1/forgot", handleForgotPass)

module.exports ={ forgotPass}