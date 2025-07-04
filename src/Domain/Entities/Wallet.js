class WalletTransaction {
  constructor({ amount, transactionDate, transactionType }) {
    this.amount = amount;
    this.transactionDate = new Date(transactionDate || Date.now());
    this.transactionType = transactionType || "REFUND";
  }
}

class Wallet {
  constructor({
    _id,
    userId,
    balance = 0,
    transactions = [],
    createdAt,
    updatedAt,
  }) {
    this.id = _id;
    this.userId = userId;
    this.balance = balance;
    this.transactions = transactions.map((tx) => new WalletTransaction(tx));
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Wallet;
