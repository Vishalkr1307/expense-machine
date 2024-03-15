const User = require("..//module/user");
const Otp = require("..//module/otp");
const { validationResult } = require("express-validator");
const { formatOfError } = require("..//util/valadation");
const bcrypt = require("bcrypt");
const sentMail = require("..//util/mail");
const { newToken } = require("..//util/token");
const user = require("..//module/user");

const Register = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(404).send("User already exists");
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Bad request");
  }
};

const Login = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }

    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const matchPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!matchPassword) {
      return res.status(404).send("password does not match");
    }
    const sendData = await sentMail(user.email);

    return res.status(200).send(sendData);
  } catch (err) {
    return res.status(400).send("Bad request");
  }
};
const otpVerification = async (req, res) => {
  try {
    const id = req.params.id;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }

    const otpSchema = await Otp.findAll({ where: { userId: id } });
    if (otpSchema.length == 0) {
      return res.status(401).send("user not found");
    }
    const { expiredAt } = otpSchema[otpSchema.length - 1];
    const hashOtp = otpSchema[otpSchema.length - 1].otp;
    if (new Date(expiredAt).getTime() < new Date().getTime()) {
      await Otp.destroy({ where: { userId: id } });
      return res.status().send("You otp has expired");
    } else {
      const matchOtp = bcrypt.compareSync(req.body.otp, hashOtp);
      if (!matchOtp) {
        return res.status(401).send("You otp has incorrect");
      } else {
        await Otp.destroy({ where: { userId: id } });
        await User.update({ verified: true }, { where: { id: id } });
        const token = newToken(user);

        return res.status(200).send({
          status: "You otp have verified",
          token: token,
        });
      }
    }
  } catch (err) {
    return res.status(400).send("Bad request");
  }
};

const resendOtp = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const sendData = await sentMail(user.email);
    return res.status(200).send(sendData);
  } catch (err) {
    return res.status(400).send("bad request");
  }
};

const forgetPassword=async(req,res)=>{
  try{
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }

    const user=await User.findOne({where:{"email":req.body.email}})
    if(!user){
      return res.status(404).send("User not found");
    }
    const sendData=await sentMail(user?.email)
    return res.status(200).send(sendData)

  }
  catch(err){
    return res.status(400).send("bad request");
  }
}
const resetPassword=async(req,res)=>{
  try{
    const id=req.params.id
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }
    const user=await User.update({password:bcrypt.hashSync(req.body.password,8)},{where:{"id":id}})
    return res.status(200).send("password updated successfully")


  }
  catch(err){
    
    return res.status(400).send("bad request");
  }
}

module.exports = { Register, Login, otpVerification, resendOtp,forgetPassword,resetPassword };
