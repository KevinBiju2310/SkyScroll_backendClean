class FetchAllAircraftsUseCase {
  constructor(aircraftRepository) {
    this.aircraftRepository = aircraftRepository;
  }

  async execute() {
    try {
        const aircrafts = await this.aircraftRepository.findAllAircrafts();
        return aircrafts;
    } catch (error) {
      throw new Error("Error fetchAllAircraftsUseCase");
    }
  }
}

module.exports = FetchAllAircraftsUseCase;
