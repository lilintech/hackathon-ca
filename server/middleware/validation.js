const { body, validationResult } = require("express-validator");

// middleware for validating user inputs

// ! validation for report crime
const reportValidationRules = () => {
  return [
    // check email address
    body("email_address").isEmail().withMessage("Email is not valid"),
    // check phone number
    body("phone_number").isMobilePhone().withMessage("Not valid phone number"),
    body("gender")
      .custom((value) => {
        if (value !== "male" && value !== "female") {
          throw new Error("Invalid gendder value");
        }
        return true;
      })
      .notEmpty()
      .withMessage("gender cannot be empty"),
  ];
};

const validateReport = (req, res, success) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return success();
  }
  const extractedErrors = errors.array().map((err) => {
    return { param: err.param, msg: err.msg };
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};

// ! validation rules for signup
const validationRules = () => {
  return [
    // check email
    body("email").isEmail().withMessage("Email is not valid"),
    // check password
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be 8 characters or longer"),
    // check username
    body("username")
      .isLength({ min: 3 })
      .withMessage("username should be 3 or more characters"),
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



// ! login validation rules

// check valid email or username helper
function isValidEmail(value){
  return[
    body(value).isEmail()
  ]
}

function isValidUsername(value){
  body(value).isLength({min: 3})
}

const loginvalidationRules = () => {
  return [
    body("emailOrUsername")
      .notEmpty()
      .withMessage("Filed cannot be empty")
      .custom((value) => {
        if (!isValidEmail(value) && !isValidUsername(value)) {
          throw new Error("Invalid email or userna,e");
        }
        return true;
      }),
  ];
};


// perform check
const validateLogin = (req, res, success) => {
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

module.exports = {
  validate,
  validationRules,
  reportValidationRules,
  validateReport,
  validateLogin,
  loginvalidationRules
};
