const express = require('express');
const { handleChangePass } = require('../controllers/passContoller');
const changePass = express.Router();

changePass.post("/api/v1/change-pass", handleChangePass)

module.exports ={changePass}