const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const connDB = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connDB.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

