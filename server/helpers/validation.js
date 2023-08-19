const {body, validationResult} = require("express-validator");

// custom validation for comparing 2 values
const matchPass = (value, {req}) =>{
    return value === req.body.newPass;
}


// define rules for validation
const validationRules = () => {
  return [
    // check email
    body('email').isEmail().withMessage("Email is not valid"),
    // check password
    body('password').isLength({ min: 8 }).withMessage("Password should be 8 characters or longer"),
    // check username
    body('username').isLength({min: 3}).withMessage("username should be 3 or more characters"),
    // check same new pass and confirm pass
    body('confirmPass').custom(matchPass)
  ];
};

// perform check
const validate = (req, res, success) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return success();
  }

//   get errors from express validator
  const extractedErrors = errors.array().map((err) => {
    return { param: err.param, msg: err.msg };
  }); 
 
  return res.status(422).json({
    errors: extractedErrors,
  });

};
module.exports = { validate, validationRules };

