const connection = require("../db");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  // hash passwords
  const hashedPass = await bcrypt.hash(password, 10);

  try {
    // query takes 3 args, (query,values,callback)
    connection.query(
      "INSERT INTO Users(username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPass], //follow order
      // callback takes 3 args
      (err, results, fields) => {
        if (err) {
          return res.status(400).json("Error writing to database" + err);
        }

        return res.status(201).json({ message: "User added successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json("An error occured");
  }
};

module.exports = {handleNewUser}
