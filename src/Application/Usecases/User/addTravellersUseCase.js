class AddTravellersUseCase {
  constructor(travellerRepository) {
    this.travellerRepository = travellerRepository;
  }

  async execute(userId, travellerDetails) {
    try {
      const { passportNumber } = travellerDetails;
      const existingPassportNumber =
        await this.travellerRepository.findByPassportNumber(passportNumber);
      if (existingPassportNumber) {
        throw new Error("Passport number is incorrect");
      }
      travellerDetails.userId = userId;
      const createdTraveller = await this.travellerRepository.createTraveller(
        travellerDetails
      );
      return createdTraveller;
    } catch (error) {
      throw new Error("Error addTraveller useCase");
    }
  }
}

module.exports = AddTravellersUseCase;
