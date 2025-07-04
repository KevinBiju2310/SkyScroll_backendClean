class TripController {
  constructor(
    addTripUseCase,
    getAllTripsUseCase,
    updateTripUseCase,
    deleteTripUseCase,
    searchFlightUseCase,
    flightDetailsUseCase,
    createBookingUseCase,
    getAllBookingsUseCase
  ) {
    this.addTripUseCase = addTripUseCase;
    this.getAllTripsUseCase = getAllTripsUseCase;
    this.updateTripUseCase = updateTripUseCase;
    this.deleteTripUseCase = deleteTripUseCase;
    this.searchFlightUseCase = searchFlightUseCase;
    this.flightDetailsUseCase = flightDetailsUseCase;
    this.createBookingUseCase = createBookingUseCase;
    this.getAllBookingsUseCase = getAllBookingsUseCase;
  }

  async addTrips(req, res) {
    try {
      const userId = req.user.userId;
      const result = await this.addTripUseCase.execute(userId, req.body);
      res.status(200).json({ message: "Trip added successfully", result });
    } catch (error) {
      res.status(500).json({ message: error.message || "Add trip failed" });
    }
  }

  async getAllTrips(req, res) {
    try {
      const userId = req.user.userId;
      const result = await this.getAllTripsUseCase.execute(userId);
      res.status(200).json({ message: "fetched trips successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Fetching trips failed" });
    }
  }

  async updateTrip(req, res) {
    try {
      const tripId = req.params.id;
      const updatedData = req.body;
      const result = await this.updateTripUseCase.execute(tripId, updatedData);
      res.status(200).json({ message: "trip updation successfull", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Trip updation failed" });
    }
  }

  async deleteTrip(req, res) {
    try {
      const tripId = req.params.id;
      const result = await this.deleteTripUseCase.execute(tripId);
      res.status(200).json({ message: "trip deletion successfull", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Trip deletion failed" });
    }
  }

  async searchFlight(req, res) {
    try {
      const result = await this.searchFlightUseCase.execute(req.query);
      res.status(200).json({ message: "flight search successfull", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Search flight failed" });
    }
  }

  async getFlights(req, res) {
    try {
      const result = await this.flightDetailsUseCase.execute(req.params);
      res.status(200).json({ message: "fetched flight successfull", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Fetch flights failed" });
    }
  }

  async createBooking(req, res) {
    try {
      const result = await this.createBookingUseCase.execute(req.body);
      res.status(200).json({ message: "booking creation successfull", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Create booking failed" });
    }
  }

  async getBooking(req, res) {
    try {
      const userId = req.user.userId;
      const result = await this.getAllBookingsUseCase.execute(userId);
      res.status(200).json({ message: "fetched booking success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "fetch bookings failed" });
    }
  }
}

module.exports = TripController;
