class UserController {
  constructor(
    signInUseCase,
    signUpUseCase,
    verifyOtpUseCase,
    resendOtpUseCase,
    googleSignUpUseCase,
    googleSignInUseCase,
    updateProfileUseCase,
    updatePassportUseCase,
    forgotPasswordUseCase,
    resetPasswordUseCase,
    changePasswordUseCase,
    getAllTravellersUseCase,
    addTravellersUseCase,
    paymentsUseCase,
    getBookedAirlinesUseCase,
    cancelBookingUseCase,
    walletDetailsUseCase
  ) {
    this.signInUseCase = signInUseCase;
    this.signUpUseCase = signUpUseCase;
    this.verifyOtpUseCase = verifyOtpUseCase;
    this.resendOtpUseCase = resendOtpUseCase;
    this.googleSignUpUseCase = googleSignUpUseCase;
    this.googleSignInUseCase = googleSignInUseCase;
    this.updateProfileUseCase = updateProfileUseCase;
    this.updatePassportUseCase = updatePassportUseCase;
    this.forgotPasswordUseCase = forgotPasswordUseCase;
    this.resetPasswordUseCase = resetPasswordUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
    this.getAllTravellersUseCase = getAllTravellersUseCase;
    this.addTravellersUseCase = addTravellersUseCase;
    this.paymentsUseCase = paymentsUseCase;
    this.getBookedAirlinesUseCase = getBookedAirlinesUseCase;
    this.cancelBookingUseCase = cancelBookingUseCase;
    this.walletDetailsUseCase = walletDetailsUseCase;
  }

  async signUp(req, res) {
    try {
      await this.signUpUseCase.execute(req.body);
      res.status(201).json({ message: "User Created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message || "Login failed" });
    }
  }

  async verifyOtp(req, res) {
    try {
      const { userId, otp } = req.body;
      const result = await this.verifyOtpUseCase.execute(userId, otp);
      res.status(200).json({ message: "Otp verified successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message || "otp failed" });
    }
  }

  async resendOtp(req, res) {
    try {
      const { userId } = req.body;
      const result = await this.resendOtpUseCase.execute(userId);
      res.status(200).json({ message: "Reset otp sent successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message || "resend otp failed" });
    }
  }

  async signIn(req, res) {
    try {
      const { user, accessToken, refreshToken } =
        await this.signInUseCase.execute(req.body, "user");
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Login successful",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message || "Login failed" });
    }
  }

  async googleSignUp(req, res) {
    try {
      const result = await this.googleSignUpUseCase.execute(req.body);
      res.status(200).json({ message: "Google signUp success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Google Signup failed" });
    }
  }

  async googleSignIn(req, res) {
    try {
      const { user, accessToken, refreshToken } =
        await this.googleSignInUseCase.execute(req.body);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Google signIn success", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Google Signin failed" });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const updatedUser = req.body;
      const result = await this.updateProfileUseCase.execute(
        userId,
        updatedUser
      );
      res.status(200).json({ message: "Update profile success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Update Profile failed" });
    }
  }

  async updatePassport(req, res) {
    try {
      const userId = req.user.userId;
      const updatedPassport = req.body;
      const result = await this.updatePassportUseCase.execute(
        userId,
        updatedPassport
      );
      res.status(200).json({ message: "Update passport success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Update Passport failed" });
    }
  }

  async forgotPassword(req, res) {
    try {
      const result = await this.forgotPasswordUseCase.execute(req.body);
      res
        .status(200)
        .json({ message: "password reset link send to email", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Forgot Password failed" });
    }
  }

  async resetPassword(req, res) {
    try {
      const result = await this.resetPasswordUseCase.execute(req.body);
      res.status(200).json({ message: "Password Reset success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Reset Password failed" });
    }
  }

  async changePassword(req, res) {
    try {
      const userId = req.user.userId;
      const passwords = req.body;
      const result = await this.changePasswordUseCase.execute(
        userId,
        passwords
      );
      res
        .status(200)
        .json({ message: "Changed password successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Change Password failed" });
    }
  }

  async getAllTravellers(req, res) {
    try {
      const userId = req.user.userId;
      const result = await this.getAllTravellersUseCase.execute(userId);
      res.status(200).json({ message: "fetching travellers success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "fetching travellers failed" });
    }
  }

  async addTravellers(req, res) {
    try {
      const userId = req.user.userId;
      const result = await this.addTravellersUseCase.execute(userId, req.body);
      res.status(200).json({ message: "add travellers success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "add travellers failed" });
    }
  }

  async Payments(req, res) {
    try {
      const result = await this.paymentsUseCase.execute(req.body);
      res.status(200).json({ message: "Payment created successfully", result });
    } catch (error) {
      res.status(500).json({ message: error.message || "Payment failed" });
    }
  }

  async getBookedAirlines(req, res) {
    try {
      const userId = req.user.userId;
      const result = await this.getBookedAirlinesUseCase.execute(userId);
      res
        .status(200)
        .json({ message: "Fetched booked airlines successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "fetching booked airlines failed" });
    }
  }

  async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      const result = await this.cancelBookingUseCase.execute(id);
      res.status(200).json({ message: "cancel booking success", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "cancel booking failed" });
    }
  }

  async walletDetails(req, res) {
    try {
      const userId = req.user.userId;
      const result = await this.walletDetailsUseCase.execute(userId);
      res.status(200).json({ message: "fetched walled details", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "feting wallet details failed" });
    }
  }

  logout(req, res) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: error.message || "Logout failed" });
    }
  }
}

module.exports = UserController;
