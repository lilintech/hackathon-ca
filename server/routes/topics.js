const express = require('express');
const { getAllTopics } = require('../controllers/topicController');

// get all topics route
const getTopics = express.Router();
getTopics.get("/api/v1/get-all-topics", getAllTopics);

module.exports = {getTopics};