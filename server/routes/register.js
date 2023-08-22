const express = require('express')
const registerController = require('../controllers/registerController');
const { validationRules, validate } = require('../middleware/validation');

const create = express.Router();
create.post("/api/v1/create", validationRules(), validate, registerController.handleNewUser)

module.exports = {create};