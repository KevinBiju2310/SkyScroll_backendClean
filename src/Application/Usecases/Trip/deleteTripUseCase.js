class DeleteTripUseCase {
  constructor(tripRepository) {
    this.tripRepository = tripRepository;
  }

  async execute(id) {
    try {
      const trip = await this.tripRepository.delete(id);
      if (!trip) {
        throw new Error("Trip not found");
      }
      return;
    } catch (error) {
      throw new Error("Error deleteTrip useCase");
    }
  }
}

module.exports = DeleteTripUseCase;
