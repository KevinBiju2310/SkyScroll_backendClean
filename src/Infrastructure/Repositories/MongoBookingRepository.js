const BookingRepository = require("../../Domain/Repositories/BookingRepository");
const Booking = require("../../Domain/Entities/Booking");
const bookingModel = require("../Database/Models/BookingModel");

class MongoBookingRepository extends BookingRepository {
  async create(bookingData) {
    try {
      const bookingDoc = new bookingModel(bookingData);
      const savedBooking = await bookingDoc.save();
      return new Booking(savedBooking.toObject());
    } catch (error) {
      throw new Error("Failed to create Booking");
    }
  }

  async findById(id) {
    try {
      const bookingDoc = await bookingModel.findById(id);
      return new Booking(bookingDoc.toObject());
    } catch (error) {
      throw new Error("Failed to findById");
    }
  }

  async save(data) {
    try {
      return await data.save();
    } catch (error) {
      throw new Error("Failed to saveBooking");
    }
  }

  async findByUserId(id) {
    try {
      const bookingDocs = await bookingModel.find({ userId: id }).populate({
        path: "flightId",
        populate: [
          {
            path: "segments.departureAirport",
            model: "Airport",
          },
          {
            path: "segments.arrivalAirport",
            model: "Airport",
          },
          {
            path: "segments.aircraft",
            model: "Aircraft",
          },
          {
            path: "airline",
            model: "User",
          },
        ],
      });
      return bookingDocs.map((doc) => new Booking(doc.toObject()));
    } catch (error) {
      throw new Error("Failed to findUser by Id");
    }
  }

  async findBookedAirlines(id) {
    try {
      const bookingDocs = await bookingModel.find({ userId: id }).populate({
        path: "flightId",
        populate: [
          {
            path: "airline",
            model: "User",
          },
        ],
      });
      return bookingDocs.map((doc) => new Booking(doc.toObject()));
    } catch (error) {
      throw new Error("Failed to findBooked airlines");
    }
  }
}

module.exports = MongoBookingRepository;
