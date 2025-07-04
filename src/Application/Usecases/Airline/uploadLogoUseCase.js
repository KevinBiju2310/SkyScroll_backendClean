class UploadLogoUseCase {
  constructor(userRepository, fileUploadService) {
    this.userRepository = userRepository;
    this.fileUploadService = fileUploadService;
  }

  async execute(logo, airlineId) {
    try {
      const airline = await this.userRepository.findById(airlineId);
      let airlineLogoUrl = null;
      if (logo) {
        airlineLogoUrl = await this.fileUploadService.upload(
          logo,
          `logo_${airline.airlineName}`
        );
      }
      const saveLogo = await this.userRepository.updateUser(airlineId, {
        profilepic: airlineLogoUrl,
      });
      return saveLogo;
    } catch (error) {
      throw new Error("Error uploadlogousecase");
    }
  }
}

module.exports = UploadLogoUseCase;
