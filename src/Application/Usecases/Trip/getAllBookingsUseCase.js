class GetAllBookingsUseCase {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(id) {
    try {
      const allBookings = await this.bookingRepository.findByUserId(id);
      return allBookings;
    } catch (error) {
      throw new Error("Error allBookings useCase");
    }
  }
}

module.exports = GetAllBookingsUseCase;
