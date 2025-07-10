const Routes = require("../../Presentation/Routes/Routes");
const UserRoutes = require("../../Presentation/Routes/UserRoutes");
const AdminRoutes = require("../../Presentation/Routes/AdminRoutes");
const AirlineRoutes = require("../../Presentation/Routes/AirlineRoutes");
const UserController = require("../../Presentation/Controllers/UserController");
const AdminController = require("../../Presentation/Controllers/AdminController");
const SignInUseCase = require("../../Application/Usecases/User/signInUseCase");

const MongoUserRepository = require("../Repositories/MongoUserRepository");
const PasswordEncoder = require("../Services/PasswordEncoder");
const JwtTokenService = require("../Services/JwtTokenService");
const SignUpUseCase = require("../../Application/Usecases/User/signUpUseCase");
const EmailService = require("../Services/EmailService");
const AirlineController = require("../../Presentation/Controllers/AirlineController");
const RegisterUseCase = require("../../Application/Usecases/Airline/registerUseCase");
const CloudinaryUploadService = require("../Services/CloudinaryService");
const AirportRoutes = require("../../Presentation/Routes/AirportRoutes");
const AirportController = require("../../Presentation/Controllers/AirportController");
const AddAirportUseCase = require("../../Application/Usecases/Airport/addAirportUseCase");
const MongoAirportRepository = require("../Repositories/MongoAirportRepository");
const GetAirportsUseCase = require("../../Application/Usecases/Airport/getAirportsUseCase");
const GetSingleAirportUseCase = require("../../Application/Usecases/Airport/getSingleAirportUseCase");
const UpdateAirportUseCase = require("../../Application/Usecases/Airport/updateAirportUseCase");
const DeleteAirportUseCase = require("../../Application/Usecases/Airport/deleteAirportUseCase");
const AircraftRoutes = require("../../Presentation/Routes/AircraftRoutes");
const AircraftController = require("../../Presentation/Controllers/AircraftController");
const AddAircraftUseCase = require("../../Application/Usecases/Aircraft/addAircraftUseCase");
const MongoAircraftRepository = require("../Repositories/MongoAircraftRepository");
const GetAircraftsUseCase = require("../../Application/Usecases/Aircraft/getAircraftsUseCase");
const DeleteAircraftUseCase = require("../../Application/Usecases/Aircraft/deleteAircraftUseCase");
const AddSeatsUseCase = require("../../Application/Usecases/Aircraft/addSeatsUseCase");
const TripRoutes = require("../../Presentation/Routes/TripRoutes");
const TripController = require("../../Presentation/Controllers/TripController");
const AddTripUseCase = require("../../Application/Usecases/Trip/addTripUseCase");
const MongoTripRepository = require("../Repositories/MongoTripRepository");
const GetAllTripsUseCase = require("../../Application/Usecases/Trip/getAllTripsUseCase");
const UpdateTripUseCase = require("../../Application/Usecases/Trip/updateTripUseCase");
const DeleteTripUseCase = require("../../Application/Usecases/Trip/deleteTripUseCase");
const SearchFlightUseCase = require("../../Application/Usecases/Trip/searchFlightUseCase");
const FlightDetailsUseCase = require("../../Application/Usecases/Trip/flightDetailsUseCase");
const CreateBookingUseCase = require("../../Application/Usecases/Trip/createBookingUseCase");
const MongoBookingRepository = require("../Repositories/MongoBookingRepository");
const GetAllBookingsUseCase = require("../../Application/Usecases/Trip/getAllBookingsUseCase");
const verifyOtpUseCase = require("../../Application/Usecases/User/verifyOtpUseCase");
const OtpService = require("../Services/OtpService");
const ResendOtpUseCase = require("../../Application/Usecases/User/resendOtpUseCase");
const GoogleSignUpUseCase = require("../../Application/Usecases/User/googleSignUpUseCase");
const GoogleSignInUseCase = require("../../Application/Usecases/User/googleSignInUseCase");
const UpdateProfileUseCase = require("../../Application/Usecases/User/updateProfileUseCase");
const UpdatePassportUseCase = require("../../Application/Usecases/User/updatePassportUseCase");
const ForgotPasswordUseCase = require("../../Application/Usecases/User/forgotPasswordUseCase");
const ResetPasswordUseCase = require("../../Application/Usecases/User/resetPasswordUseCase");
const ChangePasswordUseCase = require("../../Application/Usecases/User/changePasswordUseCase");
const GetAllTravellersUseCase = require("../../Application/Usecases/User/getAllTravellersUseCase");
const AddTravellersUseCase = require("../../Application/Usecases/User/addTravellersUseCase");
const PaymentsUseCase = require("../../Application/Usecases/Trip/paymentsUseCase");
const GetBookedAirlinesUseCase = require("../../Application/Usecases/User/getBookedAirlinesUseCase");
const CancelBookingUseCase = require("../../Application/Usecases/User/cancelBookingUseCase");
const WalletDetailsUseCase = require("../../Application/Usecases/User/walletDetailsUseCase");
const MongoWalletRepository = require("../Repositories/MongoWalletRepository");
const MongoTravellerRepository = require("../Repositories/MongoTravellerRepository");

class Container {
  constructor() {
    this.dependencies = new Map();
    this.setUpDependencies();
  }

  setUpDependencies() {
    this.register("userRepository", () => new MongoUserRepository());
    this.register("airportRepository", () => new MongoAirportRepository());
    this.register("aircraftRepository", () => new MongoAircraftRepository());
    this.register("tripRepository", () => new MongoTripRepository());
    this.register("bookingRepository", () => new MongoBookingRepository());
    this.register("walletRepository", () => new MongoWalletRepository());
    this.register("travellerRepository", () => new MongoTravellerRepository());
    this.register("authService", () => new PasswordEncoder());
    this.register("tokenService", () => new JwtTokenService());
    this.register("emailService", () => new EmailService());
    this.register("otpService", () => new OtpService());
    this.register(
      "signUpUseCase",
      () =>
        new SignUpUseCase(
          this.resolve("userRepository"),
          this.resolve("authService"),
          this.resolve("emailService"),
          this.resolve("otpService")
        )
    );
    this.register(
      "signInUseCase",
      () =>
        new SignInUseCase(
          this.resolve("userRepository"),
          this.resolve("authService"),
          this.resolve("tokenService")
        )
    );
    this.register(
      "verifyOtpUseCase",
      () =>
        new verifyOtpUseCase(
          this.resolve("userRepository"),
          this.resolve("otpService")
        )
    );
    this.register(
      "resendOtpUseCase",
      () =>
        new ResendOtpUseCase(
          this.resolve("userRepository"),
          this.resolve("otpService"),
          this.resolve("emailService")
        )
    );
    this.register(
      "googleSignUpUseCase",
      () =>
        new GoogleSignUpUseCase(
          this.resolve("userRepository"),
          this.resolve("authService")
        )
    );
    this.register(
      "googleSignInUseCase",
      () =>
        new GoogleSignInUseCase(
          this.resolve("userRepository"),
          this.resolve("authService"),
          this.resolve("tokenService")
        )
    );
    this.register(
      "updateProfileUseCase",
      () => new UpdateProfileUseCase(this.resolve("userRepository"))
    );
    this.register(
      "updatePassportUseCase",
      () => new UpdatePassportUseCase(this.resolve("userRepository"))
    );
    this.register(
      "forgotPasswordUseCase",
      () =>
        new ForgotPasswordUseCase(
          this.resolve("userRepository"),
          this.resolve("tokenService"),
          this.resolve("emailService")
        )
    );
    this.register(
      "resetPasswordUseCase",
      () =>
        new ResetPasswordUseCase(
          this.resolve("userRepository"),
          this.resolve("tokenService"),
          this.resolve("authService")
        )
    );
    this.register(
      "changePasswordUseCase",
      () =>
        new ChangePasswordUseCase(
          this.resolve("userRepository"),
          this.resolve("authService")
        )
    );
    this.register(
      "getAllTravellersUseCase",
      () => new GetAllTravellersUseCase(this.resolve("travellerRepository"))
    );
    this.register(
      "addTravellersUseCase",
      () => new AddTravellersUseCase(this.resolve("travellerRepository"))
    );
    this.register("paymentsUseCase", () => new PaymentsUseCase());
    this.register(
      "getBookedAirlinesUseCase",
      () => new GetBookedAirlinesUseCase(this.resolve("bookingRepository"))
    );
    this.register(
      "cancelBookingUseCase",
      () =>
        new CancelBookingUseCase(
          this.resolve("bookingRepository"),
          this.resolve("walletRepository")
        )
    );
    this.register(
      "walletDetailsUseCase",
      () => new WalletDetailsUseCase(this.resolve("walletRepository"))
    );

    this.register(
      "addAirportUseCase",
      () => new AddAirportUseCase(this.resolve("airportRepository"))
    );
    this.register(
      "getAirportsUseCase",
      () => new GetAirportsUseCase(this.resolve("airportRepository"))
    );
    this.register(
      "getSingleAirportUseCase",
      () => new GetSingleAirportUseCase(this.resolve("airportRepository"))
    );
    this.register(
      "updateAirportUseCase",
      () => new UpdateAirportUseCase(this.resolve("airportRepository"))
    );
    this.register(
      "deleteAirportUseCase",
      () => new DeleteAirportUseCase(this.resolve("airportRepository"))
    );
    this.register(
      "addAircraftUseCase",
      () =>
        new AddAircraftUseCase(
          this.resolve("aircraftRepository"),
          this.resolve("fileUploadService")
        )
    );
    this.register(
      "getAircraftsUseCase",
      () =>
        new GetAircraftsUseCase(
          this.resolve("userRepository"),
          this.resolve("aircraftRepository")
        )
    );
    this.register(
      "deleteAircraftUseCase",
      () => new DeleteAircraftUseCase(this.resolve("aircraftRepository"))
    );
    this.register(
      "addSeatsUseCase",
      () => new AddSeatsUseCase(this.resolve("aircraftRepository"))
    );
    this.register(
      "addTripUseCase",
      () =>
        new AddTripUseCase(
          this.resolve("aircraftRepository"),
          this.resolve("airportRepository"),
          this.resolve("tripRepository")
        )
    );
    this.register(
      "getAllTripsUseCase",
      () =>
        new GetAllTripsUseCase(
          this.resolve("userRepository"),
          this.resolve("tripRepository")
        )
    );
    this.register(
      "updateTripUseCase",
      () => new UpdateTripUseCase(this.resolve("tripRepository"))
    );
    this.register(
      "deleteTripUseCase",
      () => new DeleteTripUseCase(this.resolve("tripRepository"))
    );
    this.register(
      "searchFlightUseCase",
      () =>
        new SearchFlightUseCase(
          this.resolve("airportRepository"),
          this.resolve("tripRepository")
        )
    );
    this.register(
      "flightDetailsUseCase",
      () => new FlightDetailsUseCase(this.resolve("tripRepository"))
    );
    this.register(
      "createBookingUseCase",
      () =>
        new CreateBookingUseCase(
          this.resolve("tripRepository"),
          this.resolve("bookingRepository")
        )
    );
    this.register(
      "getAllBookingsUseCase",
      () => new GetAllBookingsUseCase(this.resolve("bookingRepository"))
    );

    this.register(
      "userController",
      () =>
        new UserController(
          this.resolve("signInUseCase"),
          this.resolve("signUpUseCase"),
          this.resolve("verifyOtpUseCase"),
          this.resolve("resendOtpUseCase"),
          this.resolve("googleSignUpUseCase"),
          this.resolve("googleSignInUseCase"),
          this.resolve("updateProfileUseCase"),
          this.resolve("updatePassportUseCase"),
          this.resolve("forgotPasswordUseCase"),
          this.resolve("resetPasswordUseCase"),
          this.resolve("changePasswordUseCase"),
          this.resolve("getAllTravellersUseCase"),
          this.resolve("addTravellersUseCase"),
          this.resolve("paymentsUseCase"),
          this.resolve("getBookedAirlinesUseCase"),
          this.resolve("cancelBookingUseCase"),
          this.resolve("walletDetailsUseCase")
        )
    );
    this.register(
      "adminController",
      () => new AdminController(this.resolve("signInUseCase"))
    );
    this.register(
      "airportController",
      () =>
        new AirportController(
          this.resolve("addAirportUseCase"),
          this.resolve("getAirportsUseCase"),
          this.resolve("getSingleAirportUseCase"),
          this.resolve("updateAirportUseCase"),
          this.resolve("deleteAirportUseCase")
        )
    );

    this.register("fileUploadService", () => new CloudinaryUploadService());
    this.register(
      "registerUseCase",
      () =>
        new RegisterUseCase(
          this.resolve("userRepository"),
          this.resolve("fileUploadService")
        )
    );
    this.register(
      "airlineController",
      () =>
        new AirlineController(
          this.resolve("registerUseCase"),
          this.resolve("signInUseCase")
        )
    );
    this.register(
      "aircraftController",
      () =>
        new AircraftController(
          this.resolve("addAircraftUseCase"),
          this.resolve("getAircraftsUseCase"),
          this.resolve("deleteAircraftUseCase"),
          this.resolve("addSeatsUseCase")
        )
    );
    this.register(
      "tripController",
      () =>
        new TripController(
          this.resolve("addTripUseCase"),
          this.resolve("getAllTripsUseCase"),
          this.resolve("updateTripUseCase"),
          this.resolve("deleteTripUseCase"),
          this.resolve("searchFlightUseCase"),
          this.resolve("flightDetailsUseCase"),
          this.resolve("createBookingUseCase"),
          this.resolve("getAllBookingsUseCase")
        )
    );
    // Routes
    this.register(
      "userRoutes",
      () =>
        new UserRoutes(
          this.resolve("userController"),
          this.resolve("airportController"),
          this.resolve("tripController")
        )
    );
    this.register(
      "adminRoutes",
      () => new AdminRoutes(this.resolve("adminController"))
    );
    this.register(
      "airlineRoutes",
      () => new AirlineRoutes(this.resolve("airlineController"))
    );
    this.register(
      "airportRoutes",
      () => new AirportRoutes(this.resolve("airportController"))
    );
    this.register(
      "aircraftRoutes",
      () => new AircraftRoutes(this.resolve("aircraftController"))
    );
    this.register(
      "tripRoutes",
      () => new TripRoutes(this.resolve("tripController"))
    );

    this.register(
      "routes",
      () =>
        new Routes(
          this.resolve("userRoutes"),
          this.resolve("adminRoutes"),
          this.resolve("airlineRoutes"),
          this.resolve("airportRoutes"),
          this.resolve("aircraftRoutes"),
          this.resolve("tripRoutes")
        )
    );
  }

  register(name, factory) {
    this.dependencies.set(name, { factory, instance: null });
  }

  resolve(name) {
    const dependency = this.dependencies.get(name);
    if (!dependency) {
      throw new Error(`Dependency ${name} not found`);
    }
    if (!dependency.instance) {
      dependency.instance = dependency.factory();
    }
    return dependency.instance;
  }
}

module.exports = Container;
