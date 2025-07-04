class AddTripUseCase {
  constructor(aircraftRepository, airportRepository, tripRepository) {
    this.aircraftRepository = aircraftRepository;
    this.airportRepository = airportRepository;
    this.tripRepository = tripRepository;
  }

  async execute(id, tripDetails) {
    try {
      const { isDirect, segments } = tripDetails;
      if (isDirect && segments.length !== 1) {
        throw new Error("Direct flights must have exactly one segment");
      }
      if (!isDirect && segments.length < 2) {
        throw new Error("Connecting flights must have at least two segments");
      }
      const convertedSegments = await Promise.all(
        segments.map(async (segment) => {
          const {
            departureAirport,
            arrivalAirport,
            departureTime,
            arrivalTime,
            aircraft,
          } = segment;

          const aircraftDoc = await this.aircraftRepository.findByModel(
            aircraft
          );
          const departureAirportDoc = await this.airportRepository.findByName(
            departureAirport
          );
          const arrivalAirportDoc = await this.airportRepository.findByName(
            arrivalAirport
          );
          if (!aircraftDoc) {
            throw new Error("Aircraft not found");
          }
          if (!departureAirportDoc || !arrivalAirportDoc) {
            throw new Error("Invalid departure or arrival airport");
          }
          const convertedDepartureTime = moment
            .tz(departureTime, departureAirportDoc.timezone)
            .utc();
          const convertedArrivalTime = moment
            .tz(arrivalTime, arrivalAirportDoc.timezone)
            .utc();

          const duration = moment.duration(
            convertedArrivalTime.diff(convertedDepartureTime)
          );
          if (duration.asMinutes() <= 0) {
            throw new Error("Arrival time must be after departure time");
          }

          const formattedDuration = `${Math.floor(
            duration.asHours()
          )}hr ${duration.minutes()}min`;
          return {
            ...segment,
            aircraft: aircraftDoc._id,
            departureAirport: departureAirportDoc._id,
            arrivalAirport: arrivalAirportDoc._id,
            departureTime: convertedDepartureTime,
            arrivalTime: convertedArrivalTime,
            duration: formattedDuration,
          };
        })
      );
      const tripData = {
        ...tripDetails,
        airline: id,
        segments: convertedSegments,
      };
      const savedTrip = await this.tripRepository.createTrip(tripData);
      return savedTrip;
    } catch (error) {
      throw new Error("Error addTrip Use Case");
    }
  }
}

module.exports = AddTripUseCase;
