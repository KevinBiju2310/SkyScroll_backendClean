const express = require("express");

class UserRoutes {
  constructor(userController, airportController, tripController) {
    this.userController = userController;
    this.airportController = airportController;
    this.tripController = tripController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/register", (req, res) =>
      this.userController.signUp(req, res)
    );

    this.router.post("/signin", (req, res) =>
      this.userController.signIn(req, res)
    );

    this.router.post("/verify-otp", (req, res) =>
      this.userController.verifyOtp(req, res)
    );

    this.router.post("/resend-otp", (req, res) =>
      this.userController.resendOtp(req, res)
    );

    this.router.post("/register-google", (req, res) =>
      this.userController.googleSignUp(req, res)
    );

    this.router.post("/signin-google", (req, res) =>
      this.userController.googleSignIn(req, res)
    );

    this.router.put("/profile", (req, res) =>
      this.userController.updateProfile(req, res)
    );

    this.router.put("/passport", (req, res) =>
      this.userController.updatePassport(req, res)
    );

    this.router.post("/forgot-password", (req, res) =>
      this.userController.forgotPassword(req, res)
    );

    this.router.post("/reset-password", (req, res) =>
      this.userController.resetPassword(req, res)
    );

    this.router.post("/change-password", (req, res) =>
      this.userController.changePassword(req, res)
    );

    this.router.get("/other-travellers", (req, res) =>
      this.userController.getAllTravellers(req, res)
    );

    this.router.post("/other-travellers", (req, res) =>
      this.userController.addTravellers(req, res)
    );

    this.router.get("/airports", (req, res) =>
      this.airportController.getAirports(req, res)
    );

    this.router.get("/search-flight", (req, res) =>
      this.tripController.searchFlight(req, res)
    );

    this.router.get("/flight/:id", (req, res) =>
      this.tripController.getFlights(req, res)
    );

    this.router.post("/create-payment-intent", (req, res) =>
      this.userController.Payments(req, res)
    );

    this.router.post("/create-booking", (req, res) =>
      this.tripController.createBooking(req, res)
    );

    this.router.post("/logout", (req, res) =>
      this.userController.logout(req, res)
    );

    this.router.get("/bookings", (req, res) =>
      this.tripController.getBooking(req, res)
    );

    this.router.get("/booked-airlines", (req, res) =>
      this.userController.getBookedAirlines(req, res)
    );

    this.router.put("/cancelbooking/:id", (req, res) =>
      this.userController.cancelBooking(req, res)
    );

    this.router.get("/wallet", (req, res) =>
      this.userController.walletDetails(req, res)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = UserRoutes;
