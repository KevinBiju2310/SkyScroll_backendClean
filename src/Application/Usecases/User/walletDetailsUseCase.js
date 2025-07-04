class WalletDetailsUseCase {
  constructor(walletRepository) {
    this.walletRepository = walletRepository;
  }

  async execute(id) {
    try {
      const walletDetails = await this.walletRepository.findByUserId(id);
      return walletDetails;
    } catch (error) {
      throw new Error("Error walletDetails useCase");
    }
  }
}

module.exports = WalletDetailsUseCase;
