class ChangePasswordUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(id, passwords) {
    try {
      const { currentPassword, newPassword } = passwords;
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await this.authService.compare(
        currentPassword,
        user.password
      );
      if (!passwordMatch) {
        throw new Error("Current Password is incorrect");
      }
      const hashedPassword = await this.authService.hash(newPassword);
      user.password = hashedPassword;
      await this.userRepository.save(user);
      return;
    } catch (error) {
      throw new Error("Error changePassword useCase");
    }
  }
}

module.exports = ChangePasswordUseCase;
