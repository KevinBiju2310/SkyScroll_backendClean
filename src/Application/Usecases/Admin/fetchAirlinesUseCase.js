class FetchAirlinesUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(role) {
    try {
      const airlines = this.userRepository.getAirlines(role);
      return airlines;
    } catch (error) {
      throw new Error("Error fetching airlines");
    }
  }
}

module.exports = FetchAirlinesUseCase;
