const TripRepository = require("../../Domain/Repositories/TripRepository");
const Trip = require("../../Domain/Entities/Trip");
const tripModel = require("../Database/Models/TripModel");

class MongoTripRepository extends TripRepository {
  async createTrip(tripData) {
    try {
      const newTripDoc = new tripModel(tripData);
      const savedTrip = await newTripDoc.save();
      return new Trip(savedTrip);
    } catch (error) {
      throw new Error("Failed to create new Trip");
    }
  }

  async getAllTrips(id) {
    try {
      const tripDoc = await tripModel
        .find({ airline: id })
        .populate("segments.departureAirport")
        .populate("segments.arrivalAirport")
        .populate("segments.aircraft");
      return new Trip(tripDoc);
    } catch (error) {
      throw new Error("Failed to fetch all Trips");
    }
  }

  async findById(id) {
    try {
      const tripDoc = await tripModel.findById(id);
      return new Trip(tripDoc);
    } catch (error) {
      throw new Error("Failed to find trips by id");
    }
  }

  async update(id, data) {
    try {
      const tripDoc = await tripModel.findByIdAndUpdate(id, data);
      return new Trip(tripDoc);
    } catch (error) {
      throw new Error("Failed to update trip");
    }
  }

  async delete(id) {
    try {
      await tripModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Failed to delete trip");
    }
  }

  async findAllTrips(filters) {
    try {
      const tripsDoc = await tripModel
        .find(filters)
        .populate("segments.departureAirport")
        .populate("segments.arrivalAirport")
        .populate("segments.aircraft")
        .populate("airline");
      return new Trip(tripsDoc);
    } catch (error) {
      throw new Error("Failed to findAllTrips");
    }
  }

  async save(trip) {
    try {
      return await trip.save();
    } catch (error) {
      throw new Error("Failed to saveTrip");
    }
  }
}

module.exports = MongoTripRepository;
