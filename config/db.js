const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to mongodb: ' + error);
    process.exit(1);
  }
};

module.exports = connectDB;
