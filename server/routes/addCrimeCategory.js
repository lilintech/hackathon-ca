const express = require('express');
const { addNewCrimeCategoryHandler } = require('../controllers/crimeController');

const addCrimeCategory = express.Router();

addCrimeCategory.post("/api/v1/admin/add-crime", addNewCrimeCategoryHandler)

module.exports = {addCrimeCategory}