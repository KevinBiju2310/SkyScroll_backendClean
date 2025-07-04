class GoogleSignUpUseCase {
  constructor(userRepository, googleAuthService) {
    this.userRepository = userRepository;
    this.googleAuthService = googleAuthService;
  }

  async execute(googleDetails) {
    try {
      const { token } = googleDetails;
      const ticket = await this.googleAuthService.verifyToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email, name } = payload;
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("Email already in use");
      }
      const user = {
        username: name,
        email,
        googleUser: true,
      };
      const savedUser = await this.userRepository.createUser(user);
      return savedUser;
    } catch (error) {
      throw new Error("Error googleSignUp useCase");
    }
  }
}

module.exports = GoogleSignUpUseCase;
