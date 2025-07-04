const WalletRepository = require("../../Domain/Repositories/WalletRepository");
const walletModel = require("../Database/Models/WalletModel");
const Wallet = require("../../Domain/Entities/Wallet");

class MongoWalletRepository extends WalletRepository {
  async findByUserId(id) {
    try {
      const walletDoc = await walletModel.findOne({ userId: id });
      return new Wallet(walletDoc.toObject());
    } catch (error) {
      throw new Error("Failed to findUser by Id");
    }
  }

  async create(data) {
    try {
      const walletDoc = new walletModel(data);
      const savedWallet = await walletDoc.save();
      return new Wallet(savedWallet.toObject());
    } catch (error) {
      throw new Error("Failed to create Wallet");
    }
  }

  async update(id, data) {
    try {
      const updatedWallet = await walletModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return new Wallet(updatedWallet.toObject());
    } catch (error) {
      throw new Error("Failed to update Wallet");
    }
  }
}

module.exports = MongoWalletRepository;
