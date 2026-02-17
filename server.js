//Importing required packages

const express = require("express"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");

//Loading environment variables from .env file
dotenv.config();

//Enable CORS (Using POSTMAN for testing)
app.use(cors());

//Create an instance of express app
const app = express();

//Middleware to parse JSON bodies and enable CORS
app.use(express.json());

app.use("/api/v1/auth", authRoutes); //Mounting auth routes at /api/auth
app.use("/api/v1/students", studentRoutes); //Mounting student routes at /api/students 

//Connet to MongoDB using Mongoose for DB
mongoose.connect(process.env.MONGO_URI)
.then( () => {
  console.log("Connected to MongoDB Succesfully")
})
.catch( (err) => {
  console.error("Error in connecting MongoDB: ", err);
});

//Basic route for testing
app.get("/", (req,res) => {
  res.send("Server is running successfully!") 
});

app.listen(process.env.PORT);




  