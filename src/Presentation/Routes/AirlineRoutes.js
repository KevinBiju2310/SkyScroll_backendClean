const express = require("express");

class AirlineRoutes {
  constructor(airlineController, airportController) {
    this.airlineController = airlineController;
    this.airportController = airportController;
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.post("/register", (req, res) =>
      this.airlineController.register(req, res)
    );

    this.router.post("/login", (req, res) =>
      this.airlineController.signIn(req, res)
    );

    this.router.put("/profile", (req, res) =>
      this.airlineController.updateProfile(req, res)
    );

    this.router.put("/change-password", (req, res) =>
      this.airlineController.changePassword(req, res)
    );

    this.router.post("/upload-logo", (req, res) =>
      this.airlineController.uploadLogo(req, res)
    );

    this.router.get("/airports", (req, res) =>
      this.airportController.getAirports(req, res)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AirlineRoutes;
