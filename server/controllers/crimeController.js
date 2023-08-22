const connection = require("../db");

const addNewCrimeCategoryHandler = async (req, res) => {
  const category = req.body.category;
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
};

const reportIncidentHandler = async (req, res) => {
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
};

module.exports = { addNewCrimeCategoryHandler, reportIncidentHandler };
