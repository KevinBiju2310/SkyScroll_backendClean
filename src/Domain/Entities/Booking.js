class Passenger {
  constructor({
    fullName,
    gender,
    nationality,
    dateOfBirth,
    passportNumber,
    passengerType,
  }) {
    this.fullName = fullName;
    this.gender = gender;
    this.nationality = nationality;
    this.dateOfBirth = new Date(dateOfBirth);
    this.passportNumber = passportNumber;
    this.passengerType = passengerType;
  }
}

class ContactInfo {
  constructor({ email, phoneNumber }) {
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}

class Booking {
  constructor({
    _id,
    flightId,
    userId,
    paymentStatus = "PENDING",
    bookingStatus = "PENDING",
    totalAmount,
    travelClass,
    selectedSeats = new Map(),
    passengers = [],
    contactInfo,
    bookingDate = new Date(),
    createdAt,
    updatedAt,
  }) {
    this.id = _id;
    this.flightId = flightId;
    this.userId = userId;
    this.paymentStatus = paymentStatus;
    this.bookingStatus = bookingStatus;
    this.totalAmount = totalAmount;
    this.travelClass = travelClass;
    this.selectedSeats = new Map(Object.entries(selectedSeats));
    this.passengers = passengers.map((p) => new Passenger(p));
    this.contactInfo = new ContactInfo(contactInfo);
    this.bookingDate = new Date(bookingDate);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Booking;
