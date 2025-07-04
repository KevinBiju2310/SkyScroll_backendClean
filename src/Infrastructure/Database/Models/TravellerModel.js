const mongoose = require("mongoose");

const TravellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const travellerModel = mongoose.model("OtherTraveller", TravellerSchema);
module.exports = travellerModel;
