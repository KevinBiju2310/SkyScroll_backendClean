const airlineVerificationTemplate = (randomPassword) =>
  `Dear Airline,\n\nYour account has been successfully verified. Here is your temporary password: ${randomPassword}\nPlease log in and change it immediately.\n\nBest regards,\nYour Company`;

module.exports = airlineVerificationTemplate;
