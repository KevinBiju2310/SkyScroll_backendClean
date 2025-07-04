const express = require("express");

class AirportRoutes {
  constructor(airportController) {
    this.airportController = airportController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/addairport", (req, res) =>
      this.airportController.addAirport(req, res)
    );

    this.router.get("/airports", (req, res) =>
      this.airportController.getAirports(req, res)
    );

    this.router.get("/airports/:id", (req, res) =>
      this.airportController.getSingleAirport(req, res)
    );

    this.router.put("/airports/:id", (req, res) =>
      this.airportController.updateAirport(req, res)
    );

    this.router.delete("/:airportId", (req, res) =>
      this.airportController.deleteAirport(req, res)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AirportRoutes;
