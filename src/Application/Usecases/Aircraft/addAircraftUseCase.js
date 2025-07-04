class AddAircraftUseCase {
  constructor(aircraftRepository, fileUploadService) {
    this.aircraftRepository = aircraftRepository;
    this.fileUploadService = fileUploadService;
  }

  async execute(aircraftData, aircraftFiles, airlineId) {
    try {
      let airworthinessCertificateUrl = null;
      if (aircraftFiles?.airworthinessCertificate) {
        airworthinessCertificateUrl = await this.fileUploadService.upload(
          aircraftFiles.airworthinessCertificate,
          `airworthinessCertificate_${aircraftData.aircraftModel}`
        );
        const transformedData = {
          ...aircraftData,
          yearOfManufacturer: Number(aircraftData.yearOfManufacture),
          classConfig: JSON.parse(aircraftData.classConfig),
          seatingDetails: JSON.parse(aircraftData.seatingDetails).map(
            (detail) => ({
              ...detail,
              totalSeats: Number(detail.totalSeats),
              windowPrice: Number(detail.windowPrice),
              aislePrice: Number(detail.aislePrice),
              middlePrice: Number(detail.middlePrice),
              freeSeats: Number(detail.freeSeats),
            })
          ),
          airworthinessCertificate: airworthinessCertificateUrl,
          airline: airlineId,
        };
        const saveAircraft = await this.aircraftRepository.create(
          transformedData
        );
        return saveAircraft;
      }
    } catch (error) {
      throw new Error("Error addAircraftUseCase");
    }
  }
}

module.exports = AddAircraftUseCase;
