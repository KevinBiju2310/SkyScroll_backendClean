class GetAllTravellersUseCase {
  constructor(travellerRepository) {
    this.travellerRepository = travellerRepository;
  }

  async execute(id) {
    try {
      const travellers = await this.travellerRepository.findAll(id);
      return travellers;
    } catch (error) {
      throw new Error("Error getAllTravellers useCase");
    }
  }
}

module.exports = GetAllTravellersUseCase;
