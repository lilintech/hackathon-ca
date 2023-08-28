const express = require('express');
const { getAllCrimesHandler, getcategoriesHandler } = require('../controllers/crimeController');

const getCrimes = express.Router();
getCrimes.get("/api/v1/get-crimes", getAllCrimesHandler);

const getCrimesCategories = express.Router();
getCrimesCategories.get("/api/v1/get-categories", getcategoriesHandler )

module.exports = {getCrimes, getCrimesCategories}