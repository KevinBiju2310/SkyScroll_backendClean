class OtpService {
  constructor(expiryDurationInMinutes = 1) {
    this.expiryDuration = expiryDurationInMinutes * 60 * 1000;
  }

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  getExpiryTime() {
    return new Date(Date.now() + this.expiryDuration);
  }

  isOtpExpired(expiryTime) {
    return Date.now() > new Date(expiryTime).getTime();
  }

  validateOtp(inputOtp, actualOtp) {
    return Number(inputOtp) === Number(actualOtp);
  }
}

module.exports = OtpService;
