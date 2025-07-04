const nodemailer = require("nodemailer");
const otpEmailTemplate = require("../../Presentation/Utils/otpEmailTemplate");
const passwordResetEmailTemplate = require("../../Presentation/Utils/passwordResetEmailTemplate");
const airlineVerificationTemplate = require("../../Presentation/Utils/airlineVerificationTemplate");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to, subject, type, data) {
    let htmlContent;

    switch (type) {
      case "otp":
        htmlContent = otpEmailTemplate(data);
        break;
      case "passwordReset":
        htmlContent = passwordResetEmailTemplate(data);
        break;
      case "airlineVerification":
        htmlContent = airlineVerificationTemplate(data);
      default:
        throw new Error("Invalid email type");
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new Error("Email sending failed");
    }
  }
}

module.exports = EmailService;
