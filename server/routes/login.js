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
login.post("/api/v1/login", async (req,res)=>{
    const { emailOrUsername, password } = req.body;
    try {
        connection.query(
            `SELECT user_id, email, username, password_hash FROM Users WHERE (username = ? OR email = ?)`,
            [ emailOrUsername, emailOrUsername],
           async (error, results, fields) =>{
            if(error){
                console.log(error);
                return res.json("an error occurred")
            }
            // if nothing returns
            if(results.length === 0){
    
                return res.json("Invalid login details").status(400);
            }
            console.log(results);
            // assign var user to results from db request
            const user = results[0];
            // compare passwords
            const passwordCheck = await bcrypt.compare(password, user.password_hash)
            if(!passwordCheck){
                return res.json({message: "Inavlid login details"}).status(400);
            }
    
            return res.json({message: "login successful"}).status(200);
            }
    
        )
    } catch (error) {
        console.log(error);
        res.json({message: "Internal Error"}).status(500)
    }
})

const changePass = express.Router();
changePass.post("/api/v1/change-pass", async(req,res)=>{
    // userid, currentpass, newpass, confirmnewpass

    const { user_id, currentPass,newPass, confirmPass } = req.body;

    
})

module.exports = { create, login };
