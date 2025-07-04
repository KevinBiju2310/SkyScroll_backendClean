class UpdateProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, data) {
    try {
      const updated = await this.userRepository.updateUser(id, data);
      if (!updated) {
        throw new Error("Unable to update profile");
      }
      return updated;
    } catch (error) {
      throw new Error("Error updateProfileUseCase");
    }
  }
}

module.exports = UpdateProfileUseCase;
