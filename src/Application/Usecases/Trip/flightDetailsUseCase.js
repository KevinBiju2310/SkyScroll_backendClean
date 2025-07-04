class FlightDetailsUseCase {
  constructor(tripRepository) {
    this.tripRepository = tripRepository;
  }

  async execute(flightDetails) {
    try {
      const { id } = flightDetails;
      const findFlight = await this.tripRepository.findById(id);
      if (!findFlight) {
        throw new Error("flight not found");
      }
      const bookedSeats = await this.bookingRepository.findSeatsById(id);
      const aggregatedSeats = bookedSeats.reduce((acc, booking) => {
        for (const [key, value] of booking.selectedSeats.entries()) {
          acc[key] = acc[key] ? [...acc[key], ...value] : value;
        }
        return acc;
      }, {});
      return {
        flightDetails: findFlight,
        bookedSeats: aggregatedSeats,
      };
    } catch (error) {
      throw new Error("Error flightDetails useCase");
    }
  }
}

module.exports = FlightDetailsUseCase;
