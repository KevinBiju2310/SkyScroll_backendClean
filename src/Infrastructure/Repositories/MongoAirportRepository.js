const AirportRepository = require("../../Domain/Repositories/AirportRepository");
const Airport = require("../../Domain/Entities/Airport");
const airportModel = require("../Database/Models/AirportModel");

class MongoAirportRepository extends AirportRepository {
  async findByName(name) {
    try {
      const airportDoc = await airportModel.findOne({ name });
      if (!airportDoc) return null;
      return new Airport(airportDoc);
    } catch (error) {
      throw new Error("Failed to find airport by name");
    }
  }

  async createAirport(airportData) {
    try {
      const newAirportDoc = new airportModel(airportData);
      const savedAirport = await newAirportDoc.save();
      return new Airport(savedAirport);
    } catch (error) {
      throw new Error("Failed to create new airport");
    }
  }

  async findAll() {
    try {
      const airportsDoc = await airportModel.find();
      return new Airport(airportsDoc);
    } catch (error) {
      throw new Error("Failed to fetch all airports");
    }
  }

  async findById(id) {
    try {
      const airportDoc = await airportModel.findById(id);
      return new Airport(airportDoc);
    } catch (error) {
      throw new Error("Failed to get airport by Id");
    }
  }

  async findByName(name) {
    try {
      const airportDoc = await airportModel.findOne({ name });
      return new Airport(airportDoc);
    } catch (error) {
      throw new Error("Failed to find airport by name");
    }
  }

  async update(id, data) {
    try {
      const airportDoc = await airportModel.findByIdAndUpdate(id, data);
      return new Airport(airportDoc);
    } catch (error) {
      throw new Error("Failed to updated airport");
    }
  }

  async delete(id) {
    try {
      await airportModel.findByIdAndDelete(id);
      // return new Airport(airportDoc);
    } catch (error) {
      throw new Error("Failed to delete airport");
    }
  }
}

module.exports = MongoAirportRepository;
