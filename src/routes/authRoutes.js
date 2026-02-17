const express = require("express");
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

//REGISTER ROUTE

router.post(
  "/register",

  //Validation middleware using express-validator
  [
    body("firstName")
    .notEmpty()
    .withMessage("First name is required"),

    body("lastName")
    .notEmpty()
    .withMessage("Last name is required"),

    body("email")
    .isEmail()
    .notEmpty()
    .withMessage("Invalid email format")
    .normalizeEmail(),

    body("password")
      .isLength({min: 8})
      .withMessage("Password must be at least 8 characters long"),
    
    body("studentId")
    .notEmpty()
    .withMessage("Student ID is required"),

    body("courses")
    .notEmpty()
    .withMessage("Courses are required"),

    body("year")
    .notEmpty()
    .isInt({min: 1, max: 5})
    .withMessage("Year must be between 1 and 5"),

    body("gpa")
    .optional()
    .isFloat({min: 0, max: 10})
    .withMessage("GPA must be between 0 and 10"),

    body("phone")
    .optional()
    .isString()
    .withMessage("Invalid phone number"),

    body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string"),

    body("emergencyContact")
    .optional()
    .isString()
    .withMessage("Emergency contact must be a string")
  ],

  register
);

//LOGIN ROUTE

router.post("/login", login);

module.exports = router;
