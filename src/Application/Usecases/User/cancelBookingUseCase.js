class CancelBookingUseCase {
  constructor(bookingRepository, walletRepository) {
    this.bookingRepository = bookingRepository;
    this.walletRepository = walletRepository;
  }

  async execute(id) {
    try {
      const findBooking = await this.bookingRepository.findById(id);
      if (!findBooking) {
        throw new Error("Booking Id not found");
      }
      findBooking.bookingStatus = "CANCELLED";
      findBooking.paymentStatus = "REFUNDED";
      const updatedBooking = await this.bookingRepository.save(findBooking);
      const refundAmount = findBooking.totalAmount;
      let userWallet = await this.walletRepository.findByUserId(
        findBooking.userId
      );
      if (!userWallet) {
        const newWallet = {
          userId: findBooking.userId,
          balance: refundAmount,
          transactions: [
            {
              amount: refundAmount,
            },
          ],
        };
        userWallet = await this.walletRepository.create(newWallet);
      } else {
        userWallet.balance += refundAmount;
        userWallet.transactions.push({
          amound: refundAmount,
        });
        await this.walletRepository.update(userWallet.id, {
          balance: userWallet.balance,
          transactions: userWallet.transactions,
        });
      }
      return updatedBooking;
    } catch (error) {
      throw new Error("Error cancelBooking useCase");
    }
  }
}

module.exports = CancelBookingUseCase;
