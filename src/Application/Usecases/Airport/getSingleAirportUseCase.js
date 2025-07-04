class GetSingleAirportUseCase {
  constructor(airportRepository) {
    this.airportRepository = airportRepository;
  }

  async execute(id) {
    try {
      const airport = await this.airportRepository.findById(id);
      return airport;
    } catch (error) {
      throw new Error("Error getSingleAirportUsecase");
    }
  }
}

module.exports = GetSingleAirportUseCase;
