const express = require("express");
const { validationRules, validate } = require("../helpers/validation");
const connection = require("../db");
const bcrypt = require("bcrypt");

// ! create account route
const create = express.Router();
create.post("/api/v1/create", validationRules(), validate, async (req, res) => {
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
});

// ! login route
const login = express.Router();
login.post("/api/v1/login", async (req, res) => {
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
});

// ! change password
const changePass = express.Router();
changePass.post("/api/v1/change-pass", async (req, res) => {
  // userid, currentpass, newpass, confirmnewpass

  const { user_id, currentPass, newPass, confirmPass } = req.body;

  if (newPass !== confirmPass) {
    return res.json({ message: "Confirm and new password do not match" });
  }

  try {
    connection.query(
      "SELECT password_hash, username FROM Users WHERE user_id = ?",
      [user_id],
      async (err, results, fields) => {
        if (err) {
          return res.json({ message: "an error occurred" });
        }
        if (results.length === 0) {
          return res.json({ message: "Failed to get such user" });
        }
        const user = results[0];
        // compare passwords
        const passwordCheck = await bcrypt.compare(
          currentPass,
          user.password_hash
        );
        if (!passwordCheck) {
          return res.json({ message: "Invalid password" }).status(400);
        }

        // hash new password
        const hashNewPass = await bcrypt.hash(newPass, 10);

        // update to new password
       try {
        connection.query(
          "UPDATE Users SET password_hash = ? WHERE user_id = ?",
          [hashNewPass, user_id],
          (err, results, fields) =>{
            if(err){
              return res.json({message: "Failed to update password"})
            }
            return res.json({message: "Password changed successfully"}).status(200);
          }
        )
       } catch (error) {
        return res.json({message: "An error occurred when changing password"})
       }

      }
    );
  } catch (error) {
    return res.json("Interna server error")
  }
});

module.exports = { create, login, changePass };
