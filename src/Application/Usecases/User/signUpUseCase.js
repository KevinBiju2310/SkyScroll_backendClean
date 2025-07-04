const User = require("../../../Domain/Entities/User");

class SignUpUseCase {
  constructor(userRepository, authService, emailService, otpService) {
    this.userRepository = userRepository;
    this.authService = authService;
    this.emailService = emailService;
    this.otpService = otpService;
  }

  async execute(credentials) {
    try {
      const { email, password } = credentials;
      const existingUser = this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("Email already in use");
      }
      const hashedPassword = await this.authService.hash(password);
      const otp = this.otpService.generateOtp();
      const otpExpire = this.otpService.getExpiryTime();
      const user = new User({
        ...credentials,
        password: hashedPassword,
        otp,
        otpExpire,
        isVerified: false,
        isBlocked: false,
      });
      const savedUser = await this.userRepository.createUser(user);
      await this.emailService.sendEmail(
        savedUser.email,
        "Your OTP",
        "otp",
        otp
      );
      return new User(savedUser);
    } catch (error) {
      throw new Error(`Sign-up failed ${error.message}`);
    }
  }
}

module.exports = SignUpUseCase;
