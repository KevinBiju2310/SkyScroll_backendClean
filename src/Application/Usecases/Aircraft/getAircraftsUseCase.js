class GetAircraftsUseCase {
  constructor(userRepository, aircraftRepository) {
    this.userRepository = userRepository;
    this.aircraftRepository = aircraftRepository;
  }

  async execute(airlineId) {
    try {
      const airline = await this.userRepository.findById(airlineId);
      if (!airline) {
        throw new Error("Airline not found");
      }
      const allAircrafts = await this.aircraftRepository.findAircraftsById(
        airlineId
      );
      return allAircrafts;
    } catch (error) {
      throw new Error("Error getAircraftsUseCase");
    }
  }
}

module.exports = GetAircraftsUseCase;
