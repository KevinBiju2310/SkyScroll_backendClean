class SearchFlightUseCase {
  constructor(airportRepository, tripRepository) {
    this.airportRepository = airportRepository;
    this.tripRepository = tripRepository;
  }

  async execute(flightDetails) {
    try {
      const { fromAirport, toAirport, departureDate, returnDate, tripType } =
        flightDetails;
      const deptAirport = await this.airportRepository.findByName(fromAirport);
      const arrAirport = await this.airportRepository.findByName(toAirport);
      if (!deptAirport || !arrAirport) {
        throw new Error("Airports not found");
      }
      const searchCriteria = {
        "segments.departureAirport": deptAirport._id,
        "segments.arrivalAirport": arrAirport._id,
        "segments.departureTime": {
          $gte: new Date(departureDate),
          $lt: new Date(
            new Date(departureDate).setDate(
              new Date(departureDate).getDate() + 1
            )
          ),
        },
      };
      if (tripType === "roundTrip" && returnDate) {
        const returnSearchCriteria = {
          "segments.departureAirport": arrAirport._id,
          "segments.arrivalAirport": deptAirport._id,
          "segments.departureTime": {
            $gte: new Date(returnDate),
            $lt: new Date(
              new Date(returnDate).setDate(new Date(returnDate).getDate() + 1)
            ),
          },
        };
        const outboundFlights = await this.tripRepository.findAllTrips(
          searchCriteria
        );
        const returnFlights = await this.tripRepository.findAllTrips(
          returnSearchCriteria
        );
        return { outboundFlights, returnFlights };
      } else {
        const outboundFlights = await this.tripRepository.findAllTrips(
          searchCriteria
        );
        return { outboundFlights };
      }
    } catch (error) {
      throw new Error("Error searchFlight useCase");
    }
  }
}

module.exports = SearchFlightUseCase;
