class Seat {
  constructor({ seatNumber, type, status }) {
    this.seatNumber = seatNumber;
    this.type = type;
    this.status = status;
  }
}

class SeatingDetails {
  constructor({
    classType,
    totalSeats,
    windowPrice,
    aislePrice,
    middlePrice,
    freeSeats = 0,
    seats = [],
  }) {
    this.class = classType;
    this.totalSeats = totalSeats;
    this.windowPrice = windowPrice;
    this.aislePrice = aislePrice;
    this.middlePrice = middlePrice;
    this.freeSeats = freeSeats;
    this.seats = seats.map(seat => new Seat(seat));
  }
}

class Aircraft {
  constructor({
    _id,
    aircraftModel,
    manufacturer,
    yearOfManufacturer,
    registrationNumber,
    serialNumber,
    engineManufacturer,
    engineModel,
    lastMaintenanceDate,
    nextMaintenanceDate,
    airworthinessCertificate,
    rows,
    columns,
    aisles,
    approvalStatus = "pending",
    classConfig = [],
    seatingDetails = [],
    airline,
    createdAt,
    updatedAt,
  }) {
    this.id = _id;
    this.aircraftModel = aircraftModel;
    this.manufacturer = manufacturer;
    this.yearOfManufacturer = yearOfManufacturer;
    this.registrationNumber = registrationNumber;
    this.serialNumber = serialNumber;
    this.engineManufacturer = engineManufacturer;
    this.engineModel = engineModel;
    this.lastMaintenanceDate = new Date(lastMaintenanceDate);
    this.nextMaintenanceDate = new Date(nextMaintenanceDate);
    this.airworthinessCertificate = airworthinessCertificate;
    this.rows = rows;
    this.columns = columns;
    this.aisles = aisles;
    this.approvalStatus = approvalStatus;
    this.classConfig = classConfig;
    this.seatingDetails = seatingDetails.map(
      detail => new SeatingDetails(detail)
    );
    this.airline = airline;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Aircraft;
