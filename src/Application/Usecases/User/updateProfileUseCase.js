class UpdateProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, updatedData) {
    try {
      const updatedUser = await this.userRepository.updateUser(id, updatedData);
      return updatedUser;
    } catch (error) {
      throw new Error("Error updateProfile useCase");
    }
  }
}

module.exports = UpdateProfileUseCase;
