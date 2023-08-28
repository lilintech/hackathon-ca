const connection = require("../db");

// get all topics (topic name, desc, id)
const getAllTopics = (req, res) => {
  try {
    // query db
  connection.query(
    "SELECT topic_id, topic_name, topic_description FROM QuizTopics",
    [],
    (err, results, fields) => {
      if (err) {
        console.log(err.sqlMessage);
        return res.status(500).json({ message: "Failed to get data" });
      }
      return res.json(results);
    }
  );
  } catch (error) {
    console.log(error);
    return res.status(500).json("An error occurred" + error);
  }
};


// 

module.exports = {getAllTopics}
