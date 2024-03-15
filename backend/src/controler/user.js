const User = require("..//module/user");
const { validationResult } = require("express-validator");
const { formatOfError } = require("..//util/valadation");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).send(formatOfError(error.array()).join(","));
    }
    let user = await User.findOne({ where: { "email":req.body.email}});
    if (user) {
      return res.status(404).send("User already exists");
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    return res.status(200).send(user)
  } catch (err) {
    console.log(err);
    return res.status(400).send("Bad request");
  }
};

const Login=async (req,res)=>{
    try{
        let user=await User.findOne({where:{"email":req.body.email}})
        if(!user){
            return res.status(404).send("User not found")
        }
        const matchPassword=await bcrypt.compareSync(req.body.password,user.password)
        if(!matchPassword){
            return res.status(404).send("password does not match")

        }

        return res.status(200).send(user)
        

    }
    catch(err){
        return res.status(400).send("Bad request");
    }
}
module.exports = { Register,Login };
