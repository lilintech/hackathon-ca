const express = require('express');
const { getAllCrimesHandler } = require('../controllers/crimeController');

const getCrimes = express.Router();
getCrimes.get("/api/v1/get-crimes", getAllCrimesHandler);

module.exports = {getCrimes}