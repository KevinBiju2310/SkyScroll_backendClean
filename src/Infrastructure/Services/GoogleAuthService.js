const AuthService = require("../../Domain/Services/AuthService");
const { OAuth2Client } = require("google-auth-library");

class GoogleAuthService extends AuthService {
  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyToken({ idToken, audience }) {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience,
    });
    return ticket;
  }
}

module.exports = GoogleAuthService;
