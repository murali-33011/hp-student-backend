//Importing required packages
const dotenv = require("dotenv");
const app = require("./app"); 
const connectDB = require("./src/config/db");

//Loading environment variables from .env file
dotenv.config();

const startServer = async () => {
  try {
    await connectDB()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    });

  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

startServer();