const express = require('express');
const { handleRefreshToken } = require('../controllers/refreshTokenController');
const handleRefresh = express.Router();

handleRefresh.post("/api/v1/refresh-token", handleRefreshToken)

module.exports = {handleRefresh};