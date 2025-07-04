class UpdateAirportUseCase {
  constructor(airportRepository) {
    this.airportRepository = airportRepository;
  }

  async execute(id, data) {
    try {
      const existingAirport = await this.airportRepository.findByName(
        data.name
      );
      if (existingAirport && existingAirport.id.toString() !== id.toString()) {
        throw new Error("Airport already in use");
      }
      const updatedAirport = await this.airportRepository.update(
        id,
        data
      );
      return updatedAirport;
    } catch (error) {
      throw new Error("Error updateAirportUseCase");
    }
  }
}

module.exports = UpdateAirportUseCase;
