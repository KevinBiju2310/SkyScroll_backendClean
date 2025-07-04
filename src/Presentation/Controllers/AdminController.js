class AdminController {
  constructor(
    signInUseCase,
    fetchUsersUseCase,
    toggleBlockUsersUseCase,
    fetchAirlinesUseCase,
    toggleStatusAirlineUseCase,
    fetchAllAircraftsUseCase,
    updateAircraftStatusUseCase
  ) {
    this.signInUseCase = signInUseCase;
    this.fetchUsersUseCase = fetchUsersUseCase;
    this.toggleBlockUsersUseCase = toggleBlockUsersUseCase;
    this.fetchAirlinesUseCase = fetchAirlinesUseCase;
    this.toggleStatusAirlineUseCase = toggleStatusAirlineUseCase;
    this.fetchAllAircraftsUseCase = fetchAllAircraftsUseCase;
    this.updateAircraftStatusUseCase = updateAircraftStatusUseCase;
  }

  async signIn(req, res) {
    try {
      const { user, accessToken, refreshToken } =
        await this.signInUseCase.execute(req.body, "admin");
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
      res.status(500).json({ message: "Admin signIn-failed" });
    }
  }

  async fetchUsers(req, res) {
    try {
      const role = "user";
      const result = await this.fetchUsersUseCase.execute(role);
      res.status(200).json({ message: "fetch users successfull", result });
    } catch (error) {
      res.status(500).json({ message: "fetch users-failed" });
    }
  }

  async toggleBlockUsers(req, res) {
    try {
      const userId = req.params.id;
      const result = await this.toggleBlockUsersUseCase.execute(userId);
      res.status(200).json({ message: "block/unblock successfull", result });
    } catch (error) {
      res.status(500).json({ message: "block users failed" });
    }
  }

  async fetchAirlines(req, res) {
    try {
      const role = "airline";
      const result = await this.fetchAirlinesUseCase.execute(role);
      res.status(200).json({ message: "fetch airlines successfull", result });
    } catch (error) {
      res.status(500).json({ message: "fetch airlines failed" });
    }
  }

  async toggleStatusAirline(req, res) {
    try {
      const airlineId = req.params.id;
      const result = await this.toggleStatusAirlineUseCase.execute(airlineId);
      res.status(200).json({ message: "toggle status successfull", result });
    } catch (error) {
      res.status(500).json({ message: "status airlines failed" });
    }
  }

  async getAllAircraftsAdmin(req, res) {
    try {
      const result = await this.fetchAllAircraftsUseCase.execute();
      res
        .status(200)
        .json({ message: "all aircrafts fetched successfully", result });
    } catch (error) {
      res.status(500).json({ message: "fetching aircrafts failed" });
    }
  }

  async updateAircraftStatus(req, res) {
    try {
      const aircraftId = req.params.id;
      const result = await this.updateAircraftStatusUseCase.execute(
        aircraftId,
        req.body
      );
      res
        .status(200)
        .json({ message: "aircraft status updation successfull", result });
    } catch (error) {
      res.status(500).json({ message: "Aircraft status updation failed" });
    }
  }
}

module.exports = AdminController;
