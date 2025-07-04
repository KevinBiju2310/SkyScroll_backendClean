class Segment {
  static VALID_STATUSES = [
    "scheduled",
    "ontime",
    "delayed",
    "cancelled",
    "boarding",
    "inair",
    "landed",
  ];

  constructor({
    flightNumber,
    departureAirport,
    arrivalAirport,
    aircraft,
    departureTime,
    arrivalTime,
    departureTerminal,
    arrivalTerminal,
    departureGate,
    arrivalGate,
    duration,
    status = "scheduled",
  }) {
    if (!SegmentEntity.VALID_STATUSES.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }

    this.flightNumber = flightNumber;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.aircraft = aircraft;
    this.departureTime = new Date(departureTime);
    this.arrivalTime = new Date(arrivalTime);
    this.departureTerminal = departureTerminal;
    this.arrivalTerminal = arrivalTerminal;
    this.departureGate = departureGate;
    this.arrivalGate = arrivalGate;
    this.duration = duration;
    this.status = status;
  }
}

class Trip {
  constructor({
    airline,
    ticketPrices = {},
    isDirect,
    segments = [],
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.airline = airline;
    this.ticketPrices = {
      economy: ticketPrices.economy || 0,
      business: ticketPrices.business || 0,
      firstClass: ticketPrices.firstClass || 0,
    };
    this.isDirect = isDirect;
    this.segments = segments.map((segment) => new Segment(segment));
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Trip;
