const express = require("express");
const {
  getAllTopics,
  getQuestionsAndOptions,
} = require("../controllers/topicController");

// get all topics route
const getTopics = express.Router();
getTopics.get("/api/v1/get-all-topics", getAllTopics);

// get questions and options by topicid according to difficluty level
const optionsAndQuestions = express.Router();
optionsAndQuestions.get("/api/v1/get-easy-questions", getQuestionsAndOptions);

module.exports = { getTopics, optionsAndQuestions };
