const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected now"))
  .catch(err => console.error("MongoDB connection error:", err));
};

module.exports = connectDB;