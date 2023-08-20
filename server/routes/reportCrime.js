const express = require("express");
const {
  reportValidationRules,
  validateReport,
} = require("../helpers/validation");
const connection = require("../db");

//add crime categories
const crimeCategories = express.Router();
crimeCategories.post("/api/v1/admin/add-crime", (req, res) => {
  const category  = req.body.category;
    console.log(category);
  try {
    connection.query(
      "INSERT INTO CrimesTypes (crime_type) VALUES (?)",
      [category],
      (err, results, fields) => {
        if (err) {
            console.log(err);
          return res.json({ message: "Failed to write to database" });
        }

        return res.json({ message: "Added category successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occurred" });
  }
});

// report an incident
const reportNew = express.Router();
reportNew.post(
  "/api/v1/report",
  reportValidationRules(),
  validateReport,
  async (req, res) => {
    const {
      last_name,
      first_name,
      gender,
      email_address,
      phone_number,
      crime_id,
      crime_description,
    } = req.body;
    console.log(crime_description);

    try {
      //   write to database
      connection.query(
        "INSERT INTO ReportedCrimes (email_address, phone_number, gender, first_name, last_name, crime_description, crime_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          email_address,
          phone_number,
          gender,
          first_name,
          last_name,
          crime_description,
          crime_id,
        ],
        (err, results, fields) => {
          if (err) {
            return res.json({
              message: "Failed to write incident to database",
            });
          }

          return res.json({ message: "Incident reported successfully" });
        }
      );
    } catch (error) {
      console.log(error);
      return res.json({ message: "an error occurred" });
    }
  }
);

module.exports = { reportNew, crimeCategories };
