const connection = require("../db");
const bcrypt = require("bcrypt");

const handleUserLogin = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    connection.query(
      `SELECT user_id, email, username, password_hash FROM Users WHERE (username = ? OR email = ?)`,
      [emailOrUsername, emailOrUsername],
      async (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.json("an error occurred");
        }
        // if nothing returns
        if (results.length === 0) {
          return res.json("Invalid login details").status(400);
        }
        console.log(results);
        // assign var user to results from db request
        const user = results[0];
        // compare passwords
        const passwordCheck = await bcrypt.compare(
          password,
          user.password_hash
        );
        if (!passwordCheck) {
          return res.json({ message: "Inavlid login details" }).status(400);
        }

        return res.json({ message: "login successful" }).status(200);
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Error" }).status(500);
  }
};

module.exports = { handleUserLogin };
