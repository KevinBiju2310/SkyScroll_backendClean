class GetAirportsUseCase {
  constructor(airportRepository) {
    this.airportRepository = airportRepository;
  }

  async execute() {
    try {
      const airports = await this.airportRepository.findAll();
      return airports;
    } catch (error) {
      throw new Error("failed to retrieve all airports");
    }
  }
}

module.exports = GetAirportsUseCase;
