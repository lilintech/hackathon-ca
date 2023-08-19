const mysql = require("mysql");

// sql database connection
const connection = mysql.createConnection({
  // ! use ip address for host
  host: "127.0.0.1",
  user: "nixcraft",
  password: "root",
  database: "hackathon",
});

module.exports = connection;
