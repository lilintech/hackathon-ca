const express = require('express');
const { handleForgotPass, clickEmail, postForm } = require('../controllers/passContoller');


const forgotPass = express.Router();
forgotPass.post("/api/v1/forgot", handleForgotPass)


// click on email link
const emailLink = express.Router();
emailLink.get("/api/v1/reset/:id/:token", clickEmail)

// when user submits form for change password
emailLink.post("/api/v1/reset/:id/:token", postForm)

module.exports ={ forgotPass, emailLink}