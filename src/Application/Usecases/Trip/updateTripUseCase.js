class UpdateTripUseCase {
  constructor(tripRepository) {
    this.tripRepository = tripRepository;
  }

  async execute(id, details) {
    try {
      const findTrip = await this.tripRepository.findById(id);
      if (!findTrip) {
        throw new Error("Trip not found");
      }
      const updatedTrip = await this.tripRepository.update(id, details);
      return updatedTrip;
    } catch (error) {
      throw new Error("Error updateTrip useCase");
    }
  }
}

module.exports = UpdateTripUseCase;
