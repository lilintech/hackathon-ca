const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerification = (req, res, next) => {
  // get access token from headers
  const authHeaders = req.headers["authorization"];

  // if no auth headers
  if (!authHeaders) {
    return res.json({ message: "Unauthorised" }).sendStatus(401);
  }

  console.log(authHeaders);

  // spilt the bearer with tokem
  const token = authHeaders.split(" ")[1];

  // verify the token
  // takes, token, acces_token, callback
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.sendStatus(403);
    }
    req.user = decoded.email;
    next();
  });
};

module.exports = {jwtVerification}