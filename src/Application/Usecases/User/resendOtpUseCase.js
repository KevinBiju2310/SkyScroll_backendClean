class ResendOtpUseCase {
  constructor(userRepository, otpService, emailService) {
    this.userRepository = userRepository;
    this.otpService = otpService;
    this.emailService = emailService;
  }

  async execute(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const newOtp = this.otpService.generateOtp();
      const otpExpire = this.otpService.getExpiryTime();
      const updatedUser = await this.userRepository.updateUser(user.id, {
        otp: newOtp,
        otpExpire,
      });
      await this.emailService.sendEmail(
        updatedUser.email,
        "Resend OTP",
        "otp",
        newOtp
      );
      return;
    } catch (error) {
      throw new Error(`Resend-otp failed ${error.message}`);
    }
  }
}

module.exports = ResendOtpUseCase;
