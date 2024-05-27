const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected To Mongodb Database ${connection.connection.host}`.bgGreen
        .white
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
