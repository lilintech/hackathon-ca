const express = require("express");
const {
  reportValidationRules,
  validateReport,
} = require("../middleware/validation");
const { reportIncidentHandler } = require("../controllers/crimeController");

const reportIncident = express.Router();
reportIncident.post(
  "/api/v1/report",
  reportValidationRules(),
  validateReport,
  reportIncidentHandler
);

module.exports = {reportIncident}