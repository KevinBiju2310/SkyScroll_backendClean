class DeleteAircraftUseCase {
  constructor(aircraftRepository) {
    this.aircraftRepository = aircraftRepository;
  }

  async execute(aircraftId) {
    try {
      const aircraft = await this.aircraftRepository.delete(aircraftId);
      if (!aircraft) {
        throw new Error("Aircraft not found");
      }
      return;
    } catch (error) {
      throw new Error("Error deleteAircraftUseCase");
    }
  }
}

module.exports = DeleteAircraftUseCase;
