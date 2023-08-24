// imports
const {create} = require('./routes/register')
const connection = require("./db")


const cors = require("cors");
const bodyparser = require("body-parser");

// app configuration
const express = require("express");
const { login } = require('./routes/logIn');
const { changePass } = require('./routes/changePass');
const { forgotPass } = require('./routes/forgot');
const { reportIncident } = require('./routes/reportIncident');
const { addCrimeCategory } = require('./routes/addCrimeCategory');
const { jwtVerification } = require('./middleware/jwtVerification');
const { getCrimes } = require('./routes/getCrimes');
const { handleRefresh } = require('./routes/refreshToken');
const app = express();

// middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



// port connection
connection.connect((err) => {
  if (err) {
    console.log("failed to connect to db");
    console.log(err);
  } else {
    console.log("database connected");

    app.listen(9000, () => {
      console.log("app listening on port 9000");
    });
  }
});

// routes

// ! account stuff
// login and create account
app.use(create);
app.use(login);
app.use(changePass); //change passeord
app.use(forgotPass);  //forgot password
app.use(handleRefresh)
// below routes that need authorization
app.use(jwtVerification)
// ! report and add crime
app.use(reportIncident)
app.use(addCrimeCategory)
app.use(getCrimes); //get all reported crimes