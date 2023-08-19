// imports
const { create, login } = require("./routes/login");
const connection = require("./db")

// middlewares
const cors = require("cors");
const bodyparser = require("body-parser");

// app configuration
const express = require("express");
const app = express();

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

// login and create account
app.use(create);
app.use(login)
