class UpdateAircraftStatusUseCase {
  constructor(aircraftRepository) {
    this.aircraftRepository = aircraftRepository;
  }

  async execute(aircraftId, statusDetails) {
    try {
      const { approvalStatus } = statusDetails;
      const aircraft = await this.aircraftRepository.findById(aircraftId);
      if (!aircraft) {
        throw new Error("Aircraft not found");
      }
      aircraft.approvalStatus = approvalStatus;
      const updatedAircraft = await this.aircraftRepository.save(aircraft);
      return updatedAircraft;
    } catch (error) {
      throw new Error("Error updateAircraftStatusUseCase");
    }
  }
}

module.exports = UpdateAircraftStatusUseCase;
