const nodemailer = require("nodemailer");
require("dotenv").config();
const Otp = require("..//module/otp");
const User = require("..//module/user");
const bcrypt = require("bcrypt");
const Mailgen = require("mailgen");

module.exports = async (email) => {
  const transport = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const user = await User.findOne({ where: { email: email } });
  const otp = Math.round(Math.random() * 1000 + 9000).toString();
  const hashOtp = bcrypt.hashSync(otp, 8);
  const otpVerification = await Otp.create({
    userId: user.id,
    otp: hashOtp,
    createdAt: Date.now(),
    expiredAt: Date.now() + 60 * 1000 * 2,
  });
  await otpVerification.save();
  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: process.env.URL,
    },
  });

  var email = {
    body: {
      name: user.name,
      intro:
        "Welcome to expense-mangment! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Mailgen, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: otp,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  var emailBody = mailGenerator.generate(email);
  var emailText = mailGenerator.generatePlaintext(email)
  const info=await transport.sendMail({
    from:process.env.GMAIL_EMAIL,
    to:user.email,
    subject:"Otp verification",
    html:emailBody,
    text:emailText

  })
  return {status:`otp sent to your ${user.email}`,email:user.email,userId:otpVerification.userId,expiredAt:otpVerification.expiredAt}
};
