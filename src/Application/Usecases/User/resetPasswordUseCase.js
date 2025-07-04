class ResetPasswordUseCase {
  constructor(userRepository, tokenService, authService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.authService = authService;
  }

  async execute(passwordDetails) {
    try {
      const { token, newPassword } = passwordDetails;
      const decoded = this.tokenService.verifyResetToken(token);
      const user = await this.userRepository.findByEmail(decoded.email);
      if (!user) {
        throw new Error("User not found");
      }
      const hashedPassword = await this.authService.hash(newPassword);
      user.password = hashedPassword;
      await this.userRepository.save(user);
      return;
    } catch (error) {
      throw new Error("Error ResetPassword useCase");
    }
  }
}

module.exports = ResetPasswordUseCase;
