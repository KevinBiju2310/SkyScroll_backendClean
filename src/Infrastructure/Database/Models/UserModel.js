const mongoose = require("mongoose");

const PassportSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  passportNumber: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    otp: {
      type: Number,
    },
    otpExpire: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin", "airline"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    airlineName: {
      type: String,
    },
    profilepic: {
      type: String,
    },
    iataCode: {
      type: String,
    },
    airlineWebsite: {
      type: String,
    },
    country: {
      type: String,
    },
    designation: {
      type: String,
    },
    licenseDocument: {
      type: String,
    },
    insuranceDocument: {
      type: String,
    },
    googleUser: {
      type: Boolean,
      default: false,
    },
    passportDetails: PassportSchema,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
