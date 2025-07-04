class GetBookedAirlinesUseCase {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(userId) {
    try {
      const bookedAirlines = await this.bookingRepository.findBookedAirlines(
        userId
      );
      const onlyAirlines = bookedAirlines.map(
        (booking) => booking.flightId.airline
      );
      const uniqueAirlines = onlyAirlines.filter(
        (airline, index, self) =>
          index ===
          self.findIndex((a) => a._id.toString() === airline._id.toString())
      );
      return uniqueAirlines;
    } catch (error) {
      throw new Error("Error bookedAirlines useCase");
    }
  }
}

module.exports = GetBookedAirlinesUseCase;
