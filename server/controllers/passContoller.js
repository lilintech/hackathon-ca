const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// ! change password
const handleChangePass = async (req, res) => {
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
            (err, results, fields) => {
              if (err) {
                return res.json({ message: "Failed to update password" });
              }
              return res
                .json({ message: "Password changed successfully" })
                .status(200);
            }
          );
        } catch (error) {
          return res.json({
            message: "An error occurred when changing password",
          });
        }
      }
    );
  } catch (error) {
    return res.json("Interna server error");
  }
};

// ! forgot password
// logic
// 1. does user exist
// 2. send reset link token to email if exists
// 3. check if token is valid
// 4. if valid reset password and update db
const handleForgotPass = (req, res) => {
  // get email from user
  const { email } = req.body;

  try {
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
        const user = results[0];
        //  generate token using jwt
        console.log(user);

        const token = jwt.sign(
          { email: user.email, id: user.user_id },
          process.env.MY_SECRET,
          { expiresIn: "20m" }
        );

        // generate link to send
        const link = `${process.env.SERVER_URL}/api/v1/reset/${user.user_id}/${token}`;
        console.log(link);

        // send the link via email
        return res.json("doen");
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "An error ocurred" });
  }
};

// on email link click
const clickEmail = (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  try {
    // check if user exists
    connection.query(
      "SELECT user_id, email, username FROM Users WHERE user_id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.json("an error occurred");
        }
        // if nothing returns
        if (results.length === 0) {
          return res.json("No User found").status(400);
        }
        const user = results[0];

        // verify the token received
        jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
          if (err) {
            console.log(err);
            return res.sendStatus(401);
          }
        });
        res.render("../views/index", { email: user.email });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occurred" });
  }
};

// when user submits form for change password
const postForm = async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password) {
    return res.json("Password cannot be empty");
  } else if (password !== confirmPassword) {
    return res.json("Passwords do not match");
  }

  try {
    connection.query(
      "SELECT user_id, email, username FROM Users WHERE user_id = ?",
      [id],
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.json("an error occurred");
        }
        // if nothing returns
        if (results.length === 0) {
          return res.status(400).json("No User found");
        }
        const user = results[0];
        // verify the token received
        jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
          if (err) {
            console.log(err);
            return res.sendStatus(401);
          }
        });

        // write new password to database
        // update to new password
        const hashNewPass = await bcrypt.hash(password, 10);
        try {
          connection.query(
            "UPDATE Users SET password_hash = ? WHERE user_id = ?",
            [hashNewPass, id],
            (err, results, fields) => {
              if (err) {
                return res.render("../views/error");
              }
              return res.render("../views/success");
            }
          );
        } catch (error) {
          return res.render("../views/error");
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.render("../views/error");
  }
};

module.exports = { handleChangePass, handleForgotPass, clickEmail, postForm };
