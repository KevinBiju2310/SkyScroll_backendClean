class SignInUseCase {
  constructor(userRepository, authService, tokenService) {
    this.userRepository = userRepository;
    this.authService = authService;
    this.tokenService = tokenService;
  }

  async execute(credentials, requiredRole) {
    try {
      const { email, password } = credentials;
      const user = await this.userRepository.findByEmail(email);
      const passwordMatch = await this.authService.compare(
        password,
        user.password
      );
      if (!user || !passwordMatch) {
        throw new Error("Incorrect email or password");
      }
      if (user.role !== "admin" && !user.isVerified) {
        throw new Error("User is not verified");
      }
      if (user.isBlocked) {
        throw new Error("User is blocked");
      }
      if (requiredRole && user.role !== requiredRole) {
        throw new Error(`Access denied. ${requiredRole} privileges required`);
      }
      const accessToken = this.tokenService.generateAccessToken(
        user.id,
        user.role
      );
      const refreshToken = this.tokenService.generateRefreshToken(
        user.id,
        user.role
      );
      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(`Sign-In Failed: ${error.message}`);
    }
  }
}

module.exports = SignInUseCase;
