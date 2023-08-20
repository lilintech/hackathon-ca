const express = require('express');
const connection = require("../db");


// logic
// 1. does user exist
// 2. send reset link token to email if exists
// 3. check if token is valid
// 4. if valid reset password and update db

// forgot password
const forgotPass = express.Router();
forgotPass.post("/api/v1/forgot", async (req,res)=>{
    // get email from user
    const { email } = req.body;

    connection.query(
        // search database for the email or username
        "SELECT user_id, email, username FROM Users WHERE email = ?",
      [email],
      async (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.json("an error occurred");
        }
        // if nothing returns
        if (results.length === 0) {
          return res.json("No email found").status(400);
        }
      }
    )

    // send email with reset link to user
    // udate passowrd
})

module.exports = {forgotPass}