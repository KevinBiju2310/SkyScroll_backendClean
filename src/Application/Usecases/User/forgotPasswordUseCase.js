class ForgotPasswordUseCase {
  constructor(userRepository, tokenService, emailService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.emailService = emailService;
  }

  async execute(emailDetails) {
    try {
      const { email } = emailDetails;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.role === "airline" && !user.isVerified) {
        throw new Error(
          "Only verified airline users can reset their password."
        );
      }
      const resetToken = this.tokenService.generateResetToken(user.email);
      const resetLink = `https://skyscroll.live/reset-password?token=${resetToken}`;
      await this.emailService.sendEmail(
        user.email,
        "Password Reset Request",
        "passwordReset",
        resetLink
      );
      return;
    } catch (error) {
      throw new Error("Error forgotPassword UseCase");
    }
  }
}

module.exports = ForgotPasswordUseCase;
