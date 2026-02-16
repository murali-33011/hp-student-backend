const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//Defining the Student schema

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
    type: String,
    required: true,
    trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8
    },

    studentId: {
      type: String,
      required: true,
      unique: true
    },

    courses:{
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    gpa: {
      type: Number,
      min: 0,
      max: 10
    },

    enrollmentDate: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "GRADUATED"],
      default: "ACTIVE"
    },

    phone: {
      type: String,
      required: false,
      unique: true
    },

    emergencyContact: {
      type:{
        name: String,
        phone: String
      },    
      required: false
    },

    role: {
      type: String,
      enum: ["STUDENT", "ADMIN"],
      default: "STUDENT"
    },

    address: {
      type: String
    }
  },
  {timestamps: true}
);

studentSchema.pre("save", async function (next) {
  //Only hash if password is modified
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  catch(error)
  {
    next(error);
  }
})
module.exports = mongoose.model("Student", studentSchema);

