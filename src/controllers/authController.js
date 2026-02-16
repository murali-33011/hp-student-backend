const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  
const { validationResult } = require("express-validator");

//Register Controller

exports.register = async (req,res) => {
  try{
    //1. Check validation errors from express validator
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});   
    }

    //2. Extract fields from request body
    const { firstName, lastName, email, password, studentId, courses, year, gpa, phone, address, emergencyContact } = req.body;

    //3. Check if user already exists
    const existingStudent = await Student.findOne({email})

    if (existingStudent) {
      return res.status(400).json({message: "Email already registered"});
    }

    //4. Create new student instance
    const student = new Student({
      firstName,
      lastName,
      email,
      password, //generally hashed by .presave
      studentId,
      courses,
      year,
      gpa,
      phone,
      address,
      role: "STUDENT"
    });
    
    //5. Save student to database
    await student.save();

    //6. Generate JWT token for authentication
    const token = jwt.sign(
      {
        userId: student._id,
        email: student.email,
        role: student.role
      },

      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );

    //7. Send response with token
    res.status(201).json({
      message: "Student registered successfully",
      token
    });

  }
  catch(error){
    console.error("Error during registration:", error);
    res.status(500).json({message:"Internal server error"});
  }
};

//Login Controller

exports.login = async(req,res) => {
  try{
    //1. Extract email and password
    const { email, password } = req.body;
    
    //2. Find student by email
    const student = await Student.findOne({email});

    if(!student) {
      return res.status(401).json({message : "Invalid credentials" });
    }

    //3. Compare password with hashed password
    const isMatch = await bcrypt.compare(password, student.password);

    if(!isMatch) {
      return res.status(401).json({ message : "Invalid Credentials"});
    }

    //Generate JWT
    const token = jwt.sign(
      {
        userId: student._id,
        email: student.email,
        role: student.role
      },
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );

    //5. Send token
    res.status(200).json({
      message: "Login successful",
      token
    })
  }
  catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
  }
}