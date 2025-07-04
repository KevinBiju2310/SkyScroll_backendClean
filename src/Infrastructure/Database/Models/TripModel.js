const mongoose = require("mongoose");

const SegmentSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  departureAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  arrivalAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  aircraft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aircraft",
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  departureTerminal: {
    type: String,
    required: true,
  },
  arrivalTerminal: {
    type: String,
    required: true,
  },
  departureGate: {
    type: String,
    required: true,
  },
  arrivalGate: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "scheduled",
      "ontime",
      "delayed",
      "cancelled",
      "boarding",
      "inair",
      "landed",
    ],
    default: "scheduled",
    required: true,
  },
});

const TripSchema = new mongoose.Schema(
  {
    airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrices: {
      economy: {
        type: Number,
      },
      business: {
        type: Number,
      },
      firstClass: {
        type: Number,
      },
    },
    isDirect: {
      type: Boolean,
      required: true,
    },
    segments: {
      type: [SegmentSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tripModel = mongoose.model("Trip", TripSchema);
module.exports = tripModel;
