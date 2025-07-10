const jwt = require("jsonwebtoken");
const TokenService = require("../../Domain/Services/TokenService");

class JwtTokenService extends TokenService {
  constructor() {
    super();
    this.accessSecret = process.env.ACCESS_TOKEN;
    this.refreshSecret = process.env.REFRESH_TOKEN;
    this.accessTokenExpiry = "1d";
    this.refreshTokenExpiry = "7d";
  }

  generateAccessToken(userId) {
    return jwt.sign({ userId }, this.accessSecret, {
      expiresIn: this.accessTokenExpiry,
    });
  }

  generateRefreshToken(userId) {
    return jwt.sign({ userId }, this.refreshSecret, {
      expiresIn: this.refreshTokenExpiry,
    });
  }

  generateResetToken(email) {
    return jwt.sign({ email }, this.accessSecret, { expiresIn: "1h" });
  }

  verifyResetToken(token) {
    return jwt.verify(token, this.accessSecret);
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessSecret);
    } catch (err) {
      throw new Error("Invalid or expired access token");
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.refreshSecret);
    } catch (err) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}

module.exports = JwtTokenService;
