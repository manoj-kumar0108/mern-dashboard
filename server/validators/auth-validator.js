const { z } = require("zod");

// creating object schema

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast of 3 chars." })
    .max(255, { message: "Email must not be more then 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be atleast of 6 characters" })
    .max(1024, { message: "password cannot be more than 1024 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Nam must be atleast of 3 chars." })
    .max(255, { message: "name must not be more then 255 characters" }),

  phone: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(10, { message: "Phone must be atleast of 10 chars." })
    .max(20, { message: "Phone must not be more then 20 characters" }),
});

module.exports = { signupSchema, loginSchema };
