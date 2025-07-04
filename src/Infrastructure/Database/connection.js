const mongoose = require("mongoose");

class DatabaseConnection {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("Error connecting to database: ", error);
      process.exit(1);
    }
  }
}

module.exports = DatabaseConnection;
