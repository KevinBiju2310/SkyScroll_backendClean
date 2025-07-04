class AirportController {
  constructor(
    addAirportUseCase,
    getAirportsUseCase,
    getSingleAirportUseCase,
    updateAirportUseCase,
    deleteAirportUseCase
  ) {
    this.addAirportUseCase = addAirportUseCase;
    this.getAirportsUseCase = getAirportsUseCase;
    this.getSingleAirportUseCase = getSingleAirportUseCase;
    this.updateAirportUseCase = updateAirportUseCase;
    this.deleteAirportUseCase = deleteAirportUseCase;
  }

  async addAirport(req, res) {
    try {
      const result = await this.addAirportUseCase.execute(req.body);
      res.status(200).json({ message: "Airport added successfully", result });
    } catch (error) {
      res.status(500).json({ message: error.message || "Add airport failed" });
    }
  }

  async getAirports(req, res) {
    try {
      const result = await this.getAirportsUseCase.execute();
      res
        .status(200)
        .json({ message: "Airports fetched successfully", result });
    } catch (error) {
      res.status(500).json({ message: error.message || "Get airport failed" });
    }
  }

  async getSingleAirport(req, res) {
    try {
      const airportId = req.params.id;
      const result = await this.getSingleAirportUseCase.execute(airportId);
      res
        .status(200)
        .json({ message: "Fetched single airport successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Get Single airport failed" });
    }
  }

  async updateAirport(req, res) {
    try {
      const airportId = req.params.id;
      const airportData = req.body;
      const result = await this.updateAirportUseCase.execute(
        airportId,
        airportData
      );
      res.status(200).json({ message: "update airport successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "update airport failed" });
    }
  }

  async deleteAirport(req, res) {
    try {
      const { airportId } = req.params;
      await this.deleteAirportUseCase.execute(airportId);
      res.status(200).json({ message: "airport deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "delete airport failed" });
    }
  }
}

module.exports = AirportController;
