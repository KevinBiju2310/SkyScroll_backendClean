const mongoose = require("mongoose");

const GateSchema = new mongoose.Schema({
  gateNumber: {
    type: String,
    required: true,
  },
});

const TerminalSchema = new mongoose.Schema({
  terminalName: {
    type: String,
    required: true,
  },
  gates: [GateSchema],
});

const AirportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  timezone: {
    type: String,
  },
  longitude: {
    type: Number,
    required: true,
  },
  terminals: [TerminalSchema],
});

const airportModel = mongoose.model("Airport", AirportSchema);
module.exports = airportModel;
