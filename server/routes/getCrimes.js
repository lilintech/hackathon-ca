const express = require('express');
const { getAllCrimesHandler, getcategoriesHandler } = require('../controllers/crimeController');

// get all reported crimes
const getCrimes = express.Router();
getCrimes.get("/api/v1/get-crimes", getAllCrimesHandler);

// get all crime categories for reporting
const getCrimesCategories = express.Router();
getCrimesCategories.get("/api/v1/get-categories", getcategoriesHandler )

module.exports = {getCrimes, getCrimesCategories}