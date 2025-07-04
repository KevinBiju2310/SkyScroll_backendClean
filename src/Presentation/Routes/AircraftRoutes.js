const express = require("express");

class AircraftRoutes {
  constructor(aircraftController) {
    this.aircraftController = aircraftController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/add-aircraft", (req, res) =>
      this.aircraftController.addAircraft(req, res)
    );

    this.router.get("/aircrafts", (req, res) =>
      this.aircraftController.getAllAircrafts(req, res)
    );

    this.router.delete("/deleteaircraft/:id", (req, res) =>
      this.aircraftController.deleteAircraft(req, res)
    );

    this.router.post("/aircrafts/:id/seats", (req, res) =>
      this.aircraftController.addSeats(req, res)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AircraftRoutes;
