const TravellerRepository = require("../../Domain/Repositories/TravellerRepository");
const Traveller = require("../../Domain/Entities/Traveller");
const travellerModel = require("../Database/Models/TravellerModel");

class MongoTravellerRepository extends TravellerRepository {
  async findAll(id) {
    try {
      const travellerDoc = await travellerModel.find({ userId: id });
      return new Traveller(travellerDoc);
    } catch (error) {
      throw new Error("Failed to fetch all travellers");
    }
  }

  async findByPassportNumber(passportNumber) {
    try {
      return await travellerModel.findOne({ passportNumber });
    } catch (error) {
      throw new Error("Failed to find passport number");
    }
  }

  async createTraveller(travellerData) {
    try {
      const travellerDoc = new travellerModel(travellerData);
      const savedTraveller = await travellerDoc.save();
      return new Traveller(savedTraveller);
    } catch (error) {
      throw new Error("Failed to create Traveller");
    }
  }
}

module.exports = MongoTravellerRepository;
