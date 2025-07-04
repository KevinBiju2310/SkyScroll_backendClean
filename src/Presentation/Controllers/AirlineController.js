class AirlineController {
  constructor(
    registerUseCase,
    signInUseCase,
    updateProfileUseCase,
    changePasswordUseCase
  ) {
    this.registerUseCase = registerUseCase;
    this.signInUseCase = signInUseCase;
    this.updateProfileUseCase = updateProfileUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
  }

  async register(req, res) {
    try {
      await this.registerUseCase.execute(req.body, req.files);
      res.status(201).json({ message: "Airline registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message || "registration-failed" });
    }
  }

  async signIn(req, res) {
    try {
      const { user, accessToken, refreshToken } =
        await this.signInUseCase.execute(req.body, "airline");
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Login successful",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "Airline signIn-failed" });
    }
  }

  async updateProfile(req, res) {
    try {
      const airlineId = req.user.userId;
      const updateAirline = req.body;
      const result = await this.updateProfileUseCase.execute(
        airlineId,
        updateAirline
      );
      res.status(200).json({ message: "Update successfull", data: result });
    } catch (error) {
      res.status(500).json({ message: "Update profile failed" });
    }
  }

  async changePassword(req, res) {
    try {
      const airlineId = req.user.userId;
      const passwords = req.body;
      const result = await this.changePasswordUseCase.execute(
        airlineId,
        passwords
      );
      res.status(200).json({ message: "Change password successfull", result });
    } catch (error) {
      res.status(500).json({ message: "change password failed" });
    }
  }

  async uploadLogo(req, res) {
    try {
      const airlineId = req.user.userId;
      const result = await this.uploadLogoUseCase.execute(
        req.files.logo,
        airlineId
      );
      res.status(200).json({ message: "uploadLogo successfull", result });
    } catch (error) {
      res.status(500).json({ message: "uploadLogo failed" });
    }
  }
}

module.exports = AirlineController;
