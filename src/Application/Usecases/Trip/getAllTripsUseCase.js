class GetAllTripsUseCase {
  constructor(userRepository, tripRepository) {
    this.userRepository = userRepository;
    this.tripRepository = tripRepository;
  }

  async execute(id) {
    try {
      const airlineId = await this.userRepository.findById(id);
      if (!airlineId) {
        throw new Error("Airline not found");
      }
      const trips = await this.tripRepository.findAllTrips(id);
      return trips;
    } catch (error) {
      throw new Error("Error getAllTrips UseCase");
    }
  }
}

module.exports = GetAllTripsUseCase;
