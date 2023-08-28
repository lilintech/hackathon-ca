import * as yup from "yup";

// yup form validation
export const loginSchema = yup.object({
  emailOrUsername: yup
    .string()
    .required("Email or Username is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters"),
});

export const createAccSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Should be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup.string().required("Password is required"),
});

export const reportSchema = yup.object({
  email_address: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),

  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Invlaid phone number"),

  gender: yup
    .string()
    .matches(/^(male|female)$/, "Invalid gender")
    .required(),

  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  crime_description: yup
    .string()
    .min(3)
    .required("description cannot be empty"),
});
