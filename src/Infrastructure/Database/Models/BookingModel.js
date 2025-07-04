const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "FAILED", "REFUNDED", "PENDING"],
      default: "PENDING",
    },
    bookingStatus: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED", "PENDING"],
      default: "PENDING",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    travelClass: {
      type: String,
      required: true,
    },
    selectedSeats: {
      type: Map,
      of: [String],
    },
    passengers: [
      {
        fullName: {
          type: String,
          required: true,
        },
        gender: {
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
        passportNumber: {
          type: String,
          required: true,
        },
        passengerType: {
          type: String,
          enum: ["ADULT", "CHILD"],
          required: true,
        },
      },
    ],
    contactInfo: {
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
