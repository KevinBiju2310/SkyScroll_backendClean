class RegisterUseCase {
  constructor(userRepository, fileUploadService) {
    this.userRepository = userRepository;
    this.fileUploadService = fileUploadService;
  }

  async execute(airlineData, airlineFiles) {
    try {
      const { airlineName } = airlineData;
      let airlineLicenseUrl = null;
      let insuranceCertificateUrl = null;

      if (airlineFiles?.licenseDocument) {
        airlineLicenseUrl = await this.fileUploadService.upload(
          airlineFiles.licenseDocument,
          `airlineLicense_${airlineName}`
        );
      }

      if (airlineFiles?.insuranceDocument) {
        insuranceCertificateUrl = await this.fileUploadService.upload(
          airlineFiles.insuranceDocument,
          `insuranceCertificate_${airlineName}`
        );
      }

      const airlineRegistrationDetails = {
        ...airlineData,
        licenseDocument: airlineLicenseUrl,
        insuranceDocument: insuranceCertificateUrl,
        role: "airline",
      };

      const savedAirline = await this.userRepository.createUser(
        airlineRegistrationDetails
      );
    } catch (error) {
      throw new Error("Error register-airline");
    }
  }
}

module.exports = RegisterUseCase;
