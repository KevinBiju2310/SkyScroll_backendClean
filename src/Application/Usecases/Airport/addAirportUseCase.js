class AddAirportUseCase {
  constructor(airportRepository) {
    this.airportRepository = airportRepository;
  }

  async execute(airportData) {
    try {
      const { name } = airportData;
      const existingAirport = await this.airportRepository.findByName(name);
      if (existingAirport) {
        throw new Error("Airport already exists");
      }
      const newAirport = await this.airportRepository.createAirport(
        airportData
      );
      return newAirport;
    } catch (error) {
      throw new Error("Error addAirport Use Case");
    }
  }
}

module.exports = AddAirportUseCase;
