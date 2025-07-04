class DeleteAirportUseCase {
  constructor(airportRepository) {
    this.airportRepository = airportRepository;
  }

  async execute(id) {
    try {
      const airport = await this.airportRepository.delete(id);
      if (!airport) {
        throw new Error("Airport not found");
      }
      return;
    } catch (error) {
      throw new Error("Error deleteAirportUseCase");
    }
  }
}

module.exports = DeleteAirportUseCase;
