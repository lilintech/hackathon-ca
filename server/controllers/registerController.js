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
          if (err.code === "ER_DUP_ENTRY") {
            if (err.sqlMessage.includes(email)) {
              return res.status(409).json(" An account with this email already exists");
            } else if (err.sqlMessage.includes(username)) {
              return res.status(409).json("Pick a different username");
            } else {
              console.log("Error Occurred");
            }
          }
        }

        return res.status(201).json({ message: "User added successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json("An error occured");
  }
};

module.exports = { handleNewUser };
