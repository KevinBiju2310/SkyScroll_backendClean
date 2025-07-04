const AircraftRepository = require("../../Domain/Repositories/AircraftRepository");
const aircraftModel = require("../Database/Models/AircraftModel");
const Aircraft = require("../../Domain/Entities/Aircraft");

class MongoAircraftRepository extends AircraftRepository {
  async create(data) {
    try {
      const newAircraftDoc = new aircraftModel(data);
      const savedAircraft = await newAircraftDoc.save();
      return new Aircraft(savedAircraft);
    } catch (error) {
      throw new Error("Failed to create new aircraft");
    }
  }

  async findAircraftsById(id) {
    try {
      const aircraftDoc = new aircraftModel.find({ airline: id });
      return new Aircraft(aircraftDoc);
    } catch (error) {
      throw new Error("Failed to fetch aircraft by Id");
    }
  }

  async findAllAircrafts() {
    try {
      const aircraftDoc = new aircraftModel.find().populate("airline");
      return new Aircraft(aircraftDoc);
    } catch (error) {
      throw new Error("Failed to find all aircrafts");
    }
  }

  async delete(id) {
    try {
      return await aircraftModel.findByIdAndDelete(id);
      // return new Aircraft(aircraftDoc);
    } catch (error) {
      throw new Error("Failed to delete aircraft");
    }
  }

  async save(aircraft) {
    try {
      return await aircraftModel.save(aircraft);
    } catch (error) {
      throw new Error("Failed to save aircraft");
    }
  }

  async findByModel(model) {
    try {
      const aircraftDoc = await aircraftModel.findOne({ aircraftModel: model });
      return new Aircraft(aircraftDoc);
    } catch (error) {
      throw new Error("Failed to find by model");
    }
  }
}

module.exports = MongoAircraftRepository;
