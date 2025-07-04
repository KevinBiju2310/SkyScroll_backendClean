const express = require("express");

class TripRoutes {
  constructor(tripController) {
    this.tripController = tripController;
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.post("/add-trips", (req, res) =>
      this.tripController.addTrips(req, res)
    );

    this.router.get("/trips", (req, res) =>
      this.tripController.getAllTrips(req, res)
    );

    this.router.put("/edit-trip/:id", (req, res) =>
      this.tripController.updateTrip(req, res)
    );

    this.router.delete("/trips/:id", (req, res) =>
      this.tripController.deleteTrip(req, res)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = TripRoutes;
