class AddSeatsUseCase {
  constructor(aircraftRepository) {
    this.aircraftRepository = aircraftRepository;
  }

  async execute(aircraftId, seatDetails) {
    try {
      const { classType, seats } = seatDetails;
      const aircraft = await this.aircraftRepository.findById(aircraftId);
      if (!aircraft) {
        throw new Error("Aircraft not found");
      }
      const classIndex = aircraft.seatingDetails.findIndex(
        (detail) => detail.class === classType
      );
      if (classIndex === -1) {
        throw new Error(`Class ${classType} not found`);
      }
      const updatedSeats = seats.map((seat) => ({
        ...seat,
        status: "available",
      }));
      aircraft.seatingDetails[classIndex].seats = updatedSeats;
      await this.aircraftRepository.save(aircraft);
      return aircraft;
    } catch (error) {
      throw new Error("Error Addseatsusecase");
    }
  }
}

module.exports = AddSeatsUseCase;
