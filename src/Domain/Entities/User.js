class Passport {
  constructor({
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    passportNumber,
    expiryDate,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.nationality = nationality;
    this.passportNumber = passportNumber;
    this.expiryDate = expiryDate;
  }
}

class User {
  constructor({
    id,
    username,
    email,
    phone,
    password,
    dateOfBirth,
    otp,
    otpExpire,
    role = "user",
    isBlocked = false,
    isVerified = false,
    airlineName,
    profilepic,
    iataCode,
    airlineWebsite,
    country,
    designation,
    licenseDocument,
    insuranceDocument,
    googleUser = false,
    passportDetails,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.otp = otp;
    this.otpExpire = otpExpire;
    this.role = role;
    this.isBlocked = isBlocked;
    this.isVerified = isVerified;
    this.airlineName = airlineName;
    this.profilepic = profilepic;
    this.iataCode = iataCode;
    this.airlineWebsite = airlineWebsite;
    this.country = country;
    this.designation = designation;
    this.licenseDocument = licenseDocument;
    this.insuranceDocument = insuranceDocument;
    this.googleUser = googleUser;
    this.passportDetails = passportDetails
      ? new Passport(passportDetails)
      : null;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
