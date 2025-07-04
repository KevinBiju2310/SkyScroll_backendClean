class Gate {
  constructor({ gateNumber }) {
    // if (!gateNumber) throw new Error("Gate number is required");
    this.gateNumber = gateNumber;
  }
}

class Terminal {
  constructor({ terminalName, gates = [] }) {
    // if (!terminalName) throw new Error("Terminal name is required");
    this.terminalName = terminalName;
    this.gates = gates.map((gate) => new Gate(gate));
  }
}

class Airport {
  constructor({
    _id,
    name,
    code,
    city,
    country,
    latitude,
    longitude,
    timezone,
    terminals = [],
  }) {
    // if (!name || !code || !city || !country || latitude == null || longitude == null) {
    //   throw new Error("Missing required Airport fields");
    // }

    this.id = _id;
    this.name = name;
    this.code = code;
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timezone = timezone;
    this.terminals = terminals.map((terminal) => new Terminal(terminal));
  }
}

module.exports = Airport;
