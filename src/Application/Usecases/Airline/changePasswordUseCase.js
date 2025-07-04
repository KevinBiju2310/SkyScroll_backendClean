class ChangePasswordUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(airlineId, passwords) {
    try {
      const { currentPassword, newPassword } = passwords;
      const airline = await this.userRepository.findById(airlineId);
      if (!airline) {
        throw new Error("Airline not found");
      }
      const passwordMatch = await this.authService.compare(
        currentPassword,
        airline.password
      );
      if (!passwordMatch) {
        throw new Error("Current password is incorrect");
      }
      const hashedPassword = await this.authService.hash(newPassword);
      await this.userRepository.updateUser(airlineId, {
        password: hashedPassword,
      });
      return;
    } catch (error) {
      throw new Error("Error changepassword usecase");
    }
  }
}

module.exports = ChangePasswordUseCase;
