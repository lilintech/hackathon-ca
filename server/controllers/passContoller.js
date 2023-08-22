const connection = require("../db");
const bcrypt = require('bcrypt')

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
const handleForgotPass = (req,res) =>{
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
}

module.exports = { handleChangePass, handleForgotPass };
