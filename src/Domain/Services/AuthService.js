class AuthService {
  hash(password) {
    throw new Error("Method 'hash()' not implemented.");
  }

  compare(rawPassword, hashedPassword) {
    throw new Error("Method compare() not implemented.");
  }

  verifyToken({ idToken, audience }) {
    throw new Error("Method verifyToken() not implemented");
  }
}

module.exports = AuthService;
