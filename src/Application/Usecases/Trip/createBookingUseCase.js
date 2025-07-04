class CreateBookingUseCase {
  constructor(tripRepository, bookingRepository) {
    this.tripRepository = tripRepository;
    this.bookingRepository = bookingRepository;
  }

  async execute(bookingDetail) {
    try {
      const { flightId, user, selectedSeats, travelClass } = bookingDetail;
      const checkFlight = await this.tripRepository.findById(flightId);
      if (!checkFlight) {
        throw new Error("Flight not found");
      }
      Object.entries(selectedSeats).forEach(([segmentIndex, seats]) => {
        const segment = checkFlight.segments[segmentIndex];
        if (!segment) {
          throw new Error(`Segment ${segmentIndex} not found for this flight.`);
        }
        const seatingDetails = segment.aircraft.seatingDetails.find(
          (s) => s.class.toLowerCase() === travelClass.toLowerCase()
        );
        if (!seatingDetails) {
          throw new Error(
            `Seating details for class ${travelClass} not found.`
          );
        }
        seats.forEach((seatNumber) => {
          const seat = seatingDetails.seats.find(
            (s) => s.seatNumber === seatNumber
          );
          if (seat) {
            seat.status = "booked";
          } else {
            throw new Error(
              `Seat ${seatNumber} not found in segment ${segmentIndex} for travel class ${travelClass}.`
            );
          }
        });
      });
      await this.tripRepository.save(checkFlight);
      const transformedData = {
        ...details,
        userId: user,
        paymentStatus: "SUCCESS",
        bookingStatus: "CONFIRMED",
      };
      const saveBooking = await this.bookingRepository.create(transformedData);
      return saveBooking;
    } catch (error) {
      throw new Error("Error createBooking useCase");
    }
  }
}

module.exports = CreateBookingUseCase;
