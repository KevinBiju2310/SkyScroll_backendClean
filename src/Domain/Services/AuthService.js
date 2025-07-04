class AuthService {
  hash(password) {
    throw new Error("Method 'hash()' not implemented.");
  }

  compare(rawPassword, hashedPassword) {
    throw new Error("Method compare() not implemented.");
  }
}

module.exports = AuthService;
