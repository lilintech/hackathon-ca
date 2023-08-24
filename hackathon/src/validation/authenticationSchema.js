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

