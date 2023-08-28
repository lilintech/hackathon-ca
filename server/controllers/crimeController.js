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

// ! get all categories
const getcategoriesHandler = async (req,res) =>{
  try {
    connection.query(
      "SELECT * FROM CrimesTypes",
      [],
      (err, results, fields) =>{
        if(err){
          console.log(err);
          return res.status(500).json({message: "An error occurred while fetchng"})
        }
        
        return res.json(results)
      }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "an error occurred"})
  }
}

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

// ! get all reported crimes
const getAllCrimesHandler = async (req, res) => {
  connection.query(
    "SELECT email_address, phone_number, gender, first_name, last_name, date_reported, crime_description FROM ReportedCrimes",
    [],
    (err, results, fields) => {
      if (err) {
        return res
          .json({ message: "failed to get reported crimes" })
          .sendStatus(501);
      }
      return res.json(results);
    }
  );
};

module.exports = {
  addNewCrimeCategoryHandler,
  reportIncidentHandler,
  getAllCrimesHandler,
  getcategoriesHandler
};
