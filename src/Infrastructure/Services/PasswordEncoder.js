const bcrypt = require("bcryptjs");
const AuthService = require("../../Domain/Services/AuthService");

class PasswordEncoder extends AuthService {
  constructor() {
    super();
    this.saltRounds = 10;
  }

  async hash(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compare(rawPassword, hashedPassword) {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
}

module.exports = PasswordEncoder;
