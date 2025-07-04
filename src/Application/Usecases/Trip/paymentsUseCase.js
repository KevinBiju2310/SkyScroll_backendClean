const stripe = require("stripe")(process.env.STRIPE_SECRET);

class PaymentsUseCase {
  constructor() {}

  async execute(paymentDetails) {
    try {
      const { amount } = paymentDetails;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const clientSecret = paymentIntent.client_secret;
      return clientSecret;
    } catch (error) {
      throw new Error("Error payment useCase");
    }
  }
}
module.exports = PaymentsUseCase;
