const express = require('express')
const registerController = require('../controllers/registerController');
const { validationRules, validate } = require('../middleware/validation');

const create = express.Router();
create.post("/api/v1/create", validationRules(), validate, registerController.handleNewUser)

// email verification
const verify = express.Router();
verify.get("/api/v1/verify", registerController.verifyEmail);


module.exports = {create, verify};