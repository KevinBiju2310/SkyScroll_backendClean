class verifyOtpUseCase {
  constructor(userRepository, otpService) {
    this.userRepository = userRepository;
    this.otpService = otpService;
  }

  async execute(userId, otpInput) {
    try {
      const user = this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const isExpired = this.otpService.isOtpExpired(user.otpExpire);
      if (isExpired) {
        await this.userRepository.updateUser(user.id, {
          otp: null,
          otpExpire: null,
        });
        throw new Error("OTP expired. Please request a new one.");
      }
      const isValid = this.otpService.verifyOtp(user.otp, otpInput);
      if (!isValid) {
        throw new Error("Invalid OTP. Please try again.");
      }
      const updatedUser = await this.userRepository.updateUser(user.id, {
        isVerified: true,
        otp: null,
        otpExpire: null,
      });
      return updatedUser;
    } catch (error) {
      throw new Error("Verify otp failed");
    }
  }
}

module.exports = verifyOtpUseCase;
