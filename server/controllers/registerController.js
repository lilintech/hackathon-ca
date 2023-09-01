const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailSender");
const { verificationEmail } = require("../emails/verification");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  const verified = false; //todo verify user email
  // hash passwords
  const hashedPass = await bcrypt.hash(password, 10);

  try {
    // query takes 3 args, (query,values,callback)
    connection.query(
      "INSERT INTO Users(username, email, password_hash, verified) VALUES (?, ?, ?,?)",
      [username, email, hashedPass, verified], //follow order
      // callback takes 3 args
      (err, results, fields) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            if (err.sqlMessage.includes(email)) {
              return res
                .status(409)
                .json(" An account with this email already exists");
            } else if (err.sqlMessage.includes(username)) {
              return res.status(409).json("Pick a different username");
            } else {
              console.log("Error Occurred");
            }
          }
        }

        console.log(results);
        // todo verify user email
        //send a unique link to user email, if it matches with one stored in database, mark as confirmed

        // get user details
        connection.query(
          "SELECT user_id, username, email, verified FROM Users WHERE user_id = ?",
          [results.insertId],
          async (err, result, fields) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "An error occuured when fetching" });
            }
            const user = result[0];
            console.log(user);

            // generate unique link and code
            const token = jwt.sign(
              { email: user.email },
              process.env.MY_SECRET,
              { expiresIn: "1d" }
            );

            const link = `${process.env.SERVER_URL}/api/v1/verify?token=${token}`;
            console.log(link);
            // send link via email
            const content = verificationEmail
              .replace("{link}", link)
              .replace("{AltLink}", link)
              .replace("{username}", user.username);
            const subject = "Email Verification";
            const userEmail = user.email;

            sendEmail(content, subject, userEmail)
              .then((results) => {
                console.log("RESPONSE " + results);
                return res.status(201).json({
                  message:
                    "User added successfully. Kindly confirm your email to continue login",
                });
              })
              .catch((err) => {
                console.error(err);
                return res
                  .status(201)
                  .json({
                    message:
                      "User added successfully. There was a problem sending the email. Try again later",
                  });
              });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return res.json("An error occured");
  }
};

// after sending email
const verifyEmail = (req, res) => {
  const token = req.query.token;
  // console.log(token);

  jwt.verify(
    token,
    process.env.MY_SECRET,
    (error, decoded) =>{
      if(error){
        return res.status(400).json({message: 'Invalid token'})
      }
      const userEmail = decoded.email;
      
    }
  )
  

  


  return res.json("Done")
};

module.exports = { handleNewUser, verifyEmail };
