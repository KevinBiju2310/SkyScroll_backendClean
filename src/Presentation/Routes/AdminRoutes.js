const express = require("express");

class AdminRoutes {
  constructor(adminController) {
    this.adminController = adminController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/signin", (req, res) =>
      this.adminController.signIn(req, res)
    );

    this.router.get("/users", (req, res) =>
      this.adminController.fetchUsers(req, res)
    );

    this.router.patch("/toggleblock/:id", (req, res) =>
      this.adminController.toggleBlockUsers(req, res)
    );

    this.router.get("/airlines", (req, res) =>
      this.adminController.fetchAirlines(req, res)
    );

    this.router.patch("/toggleStatus/:id", (req, res) =>
      this.adminController.toggleStatusAirline(req, res)
    );

    this.router.get("/aircrafts", (req, res) =>
      this.adminController.getAllAircraftsAdmin(req, res)
    );

    this.router.patch("/aircrafts/:id", (req, res) =>
      this.adminController.updateAircraftStatus(req, res)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AdminRoutes;
