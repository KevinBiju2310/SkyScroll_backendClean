class UpdatePassportUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, updatedData) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedPassportDetails = {
        passportDetails: {
          firstName: updatedData.firstName || user.passportDetails?.firstName,
          lastName: updatedData.lastName || user.passportDetails?.lastName,
          dateOfBirth:
            updatedData.dateOfBirth || user.passportDetails?.dateOfBirth,
          nationality:
            updatedData.nationality || user.passportDetails?.nationality,
          passportNumber:
            updatedData.passportNumber || user.passportDetails?.passportNumber,
          expiryDate:
            updatedData.expiryDate || user.passportDetails?.expiryDate,
        },
      };
      const updatedUser = await this.userRepository.updateUser(
        id,
        updatedPassportDetails
      );
      return updatedUser;
    } catch (error) {
      throw new Error("Error updatePassport useCase");
    }
  }
}

module.exports = UpdatePassportUseCase;
