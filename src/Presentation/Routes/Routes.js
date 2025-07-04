const express = require("express");

class Routes {
  constructor(
    userRoutes,
    adminRoutes,
    airlineRoutes,
    airportRoutes,
    aircraftRoutes,
    tripRoutes
  ) {
    this.userRoutes = userRoutes;
    this.adminRoutes = adminRoutes;
    this.airlineRoutes = airlineRoutes;
    this.airportRoutes = airportRoutes;
    this.aircraftRoutes = aircraftRoutes;
    this.tripRoutes = tripRoutes;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.use("/user", this.userRoutes.getRouter());
    this.router.use("/admin", this.adminRoutes.getRouter());
    this.router.use("/airline", this.airlineRoutes.getRouter());
    this.router.use("/airport", this.airportRoutes.getRouter());
    this.router.use("/aircraft", this.aircraftRoutes.getRouter());
    this.router.use("/trip", this.tripRoutes.getRouter());
  }

  getRouter() {
    return this.router;
  }
}

module.exports = Routes;
