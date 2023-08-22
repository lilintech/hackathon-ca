const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// get new access token
const handleRefreshToken = (req,res) =>{
    // get refresh token from cookie
    const cookies = req.cookies;

    // if no jwt cookie
    if(!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    
}

