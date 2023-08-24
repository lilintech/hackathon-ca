const connection = require("../db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

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
          return res.status(400).json("Invalid login details");
        }
        // console.log(results);
        // assign var user to results from db request
        const user = results[0];

        // compare passwords
        const passwordCheck = await bcrypt.compare(
          password,
          user.password_hash
        );
        if (!passwordCheck) {
          return res.status(400).json({ message: "Inavlid login details" });
        }

        // create jwts
        const accessToken = jwt.sign(
          { email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "50s" }
        );

        const refreshToken = jwt.sign(
          { email: user.email_address },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "3d" }
        );

        // // store refresh token in cookie
        // res.cookie("jwt", refreshToken, {
        //   httpOnly: true, //prevemts xss
        //   sameSite: "None", //if hosted on different domain
        //   secure: "true", //use https only
        //   maxAge: 3 * 24 * 60 * 60 * 1000,
        // });

        // send both tokens to mobile

        return res
          .status(200)
          .json({ accessToken, refreshToken, message: "login sucessful" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = { handleUserLogin };
