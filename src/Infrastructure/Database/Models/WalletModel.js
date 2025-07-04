const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        amount: {
          type: Number,
          required: true,
        },
        transactionDate: {
          type: Date,
          default: Date.now,
        },
        transactionType: {
          type: String,
          default: "REFUND",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const walletModel = mongoose.model("Wallet", walletSchema);
module.exports = walletModel;
