const connection = require("../db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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
  console.log(email);

  try {
    connection.query(
      // search database for the email or username
      "SELECT user_id, email, username FROM Users WHERE email = ?",
      [email],
      async (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(500).json("an error occurred");
        }
        // if nothing returns
        if (results.length === 0) {
          return res.status(400).json("No email found");
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
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "wschool752@gmail.com",
            pass: process.env.MAIL,
          },
        });

        // html contenet
        const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
                <tr>
                    <td style="text-align: center; background-color: #007bff; padding: 10px;">
                        <h1 style="color: #ffffff;">Password Reset Request</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <p>Hello,</p>
                        <p>We have received a request to reset your password. If you did not request this change, please disregard this email.</p>
                        <p>To reset your password, please click the following link:</p>
                        <p><a href=${link}>Password Reset Link</a></p>
                        <p>This link is valid for the next 5 minutes. If you have any questions or concerns, please don't hesitate to contact our support team.</p>
                        <p>Best regards,<br>Cyber Safe</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        const mailOptions = {
          from: "Cyber Safe wschool752@gmail.com",
          to: user.email,
          subject: "Password Reset Request",
          html: htmlContent,
        };

        mailOptions.headers = {
          "Content-Type": "text/html",
        };

        // send email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .json({
                message: "We failed to send the email, please try again later",
              });
          } else {
            console.log("Email sent: " + info.response);
            return res.status(200).json({ message: "An email with reset link sent. Check your inbox" });
          }
        });
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
