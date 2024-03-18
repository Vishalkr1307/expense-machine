const razorpay = require("razorpay");
const { uuid } = require("uuidv4");
const Order=require("..//module/order")
const User=require("..//module/user")
const {newToken}=require("..//util/token")
require("dotenv").config();
const premium = async (req, res) => {
  try {
    const user = req.user;
    const amount = 2500;
    var rzp = new razorpay({
      key_id: process.env.RAZOR_ID,
      key_secret: process.env.RAZOR_SECRET,
    });
    const order = await rzp.orders.create({
      amount: amount,
      currency: "INR",
    });
    
    let data=await Order.create({
        orderId: order.id,
        status:"pending",
        UserId: user.id,
    })
    return res.status(200).send({data,key_id:rzp.key_id})
  } catch (err) {
    
    return res.status(500).send("Bad request");
  }
};

const updatePremium=async (req,res)=>{
    try{
        const user=req.user
        
        await Order.update(
            { paymentId: req.body.paymentId,status:req.body.status },
            { where: { orderId: req.body.orderId } }
        );
        await User.update({isPremium:true},{where:{id:user.id}})
        const premiumUser=await User.findOne({where:{id:user.id}})
        const token=newToken(premiumUser)
        
        
        res.status(200).send({status:"Your are a premium user",token})

    }
    catch(err){
        return res.status(500).send("internal server error");
    }
}

module.exports = { premium,updatePremium };
