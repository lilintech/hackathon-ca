// imports
const { create, verify } = require("./routes/register");
const connection = require("./db");

const cors = require("cors");
const bodyparser = require("body-parser");

// app configuration
const express = require("express");
const { login } = require("./routes/logIn");
const { changePass } = require("./routes/changePass");
const { forgotPass, emailLink } = require("./routes/forgot");
const { reportIncident } = require("./routes/reportIncident");
const { addCrimeCategory } = require("./routes/addCrimeCategory");
const { jwtVerification } = require("./middleware/jwtVerification");
const { getCrimes, getCrimesCategories } = require("./routes/getCrimes");
const { handleRefresh } = require("./routes/refreshToken");
const {
  getTopics,
  levelQuestions,
  optionsAndQuestions,
} = require("./routes/topics");
const app = express();
app.set("view engine", "ejs");

// middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

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
app.use(verify)
app.use(login);
app.use(changePass); //change passeord
// todo validate inputs
app.use(forgotPass); //forgot password
app.use(emailLink); //on email link click
app.use(handleRefresh);
// below routes that need authorization
// app.use(jwtVerification)
// ! report and add crime
app.use(reportIncident);
app.use(getCrimesCategories);
app.use(addCrimeCategory);
app.use(getCrimes); //get all reported crimes

// !topics stuff
app.use(getTopics);
app.use(optionsAndQuestions); // get questions and options by topicid according to difficluty level
