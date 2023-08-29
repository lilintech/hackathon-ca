const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// get new access token
const handleRefreshToken = (req, res) => {
  // get refresh token from headers
  const authHeaders = req.headers["authorization"];

  // if no auth headers
  if (!authHeaders) {
    return res.sendStatus(401);
  }
  console.log(authHeaders);

  //   split auth jeaders
  const refreshToken = authHeaders.split(" ")[1];

  //verify the received refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // todo change error codes
      return res.sendStatus(403); 
    }
    // if valid generate new
    const newAccessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    return res.status(200).json(newAccessToken);
  });
};

module.exports = { handleRefreshToken };
