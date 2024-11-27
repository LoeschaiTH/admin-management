const mongoose = require('mongoose');
require('dotenv').config();
const mongoDbSet = process.env.MONGODB_URI;


const connectDB = async () => {
  try {
    if (!mongoDbSet) {
      throw new Error("MongoDB URI is not defined!");
    }
    await mongoose.connect(mongoDbSet, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
