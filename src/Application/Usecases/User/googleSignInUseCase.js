class GoogleSignInUseCase {
  constructor(userRepository, googleAuthService, tokenService) {
    this.userRepository = userRepository;
    this.googleAuthService = googleAuthService;
    this.tokenService = tokenService;
  }

  async execute(googleDetails) {
    try {
      const { token } = googleDetails;
      const ticket = await this.googleAuthService.verifyToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email } = payload;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.isBlocked) {
        throw new Error("User is Blocked");
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
      throw new Error("Error googleSignIn UseCase");
    }
  }
}

module.exports = GoogleSignInUseCase;
