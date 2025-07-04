class Traveller {
  constructor({
    id,
    userId,
    fullName,
    gender,
    passportNumber,
    nationality,
    dateOfBirth,
  }) {
    this.id = id;
    this.userId = userId;
    this.fullName = fullName;
    this.gender = gender;
    this.passportNumber = passportNumber;
    this.nationality = nationality;
    this.dateOfBirth = dateOfBirth;
  }
}

module.exports = Traveller;
