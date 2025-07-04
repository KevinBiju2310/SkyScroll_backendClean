class ToggleStatusAirlineUseCase {
  constructor(userRepository, emailService, passwordgenerator, authService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.authService = authService;
    this.passwordgenerator = passwordgenerator;
  }

  async execute(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("Airline not found");
      }
      if (user.role !== "airline") {
        throw new Error("User is not an airline");
      }
      user.isVerified = !user.isVerified;
      await this.userRepository.updateUser(userId, {
        isVerified: user.isVerified,
      });
      if (user.isVerified && !user.password) {
        const randomPassword = this.passwordgenerator.generate();
        const hashedPassword = this.authService.hash(randomPassword);
        await this.userRepository.updateUser(userId, {
          password: hashedPassword,
        });
        await this.emailService.sendEmail(
          user.email,
          "Your account has been verified",
          "airlineVerification",
          randomPassword
        );
      }
      return;
    } catch (error) {
      throw new Error("Error togglestatus useCase");
    }
  }
}

module.exports = ToggleStatusAirlineUseCase;
