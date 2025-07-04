class AircraftController {
  constructor(
    addAircraftUseCase,
    getAircraftsUseCase,
    deleteAircraftUseCase,
    addSeatsUseCase
  ) {
    this.addAircraftUseCase = addAircraftUseCase;
    this.getAircraftsUseCase = getAircraftsUseCase;
    this.deleteAircraftUseCase = deleteAircraftUseCase;
    this.addSeatsUseCase = addSeatsUseCase;
  }

  async addAircraft(req, res) {
    try {
      const airlineId = req.user.userId;
      const result = await this.addAircraftUseCase.execute(
        req.body,
        req.files,
        airlineId
      );
      res.status(201).json({ message: "Add aircraft successfull", result });
    } catch (error) {
      res.status(500).json({ message: "Add aircraft failed" });
    }
  }

  async getAllAircrafts(req, res) {
    try {
      const airlineId = req.user.userId;
      const result = await this.getAircraftsUseCase.execute(airlineId);
      res
        .status(200)
        .json({ message: "All aircrafts fetched successfull", result });
    } catch (error) {
      res.status(500).json({ message: "fetch aircrafts failed" });
    }
  }

  async deleteAircraft(req, res) {
    try {
      const aircraftId = req.params.id;
      const result = await this.deleteAircraftUseCase.execute(aircraftId);
      res.status(200).json({ message: "aircraft deletion success", result });
    } catch (error) {
      res.status(500).json({ message: "delete aircrafts failed" });
    }
  }

  async addSeats(req, res) {
    try {
      const aircraftId = req.params.id;
      const result = await this.addSeatsUseCase.execute(aircraftId, req.body);
      res.status(200).json({ message: "add seats successfull", result });
    } catch (error) {
      res.status(500).json({ message: "add seats failed" });
    }
  }
}

module.exports = AircraftController;
