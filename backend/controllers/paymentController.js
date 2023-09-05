
const dotenv=require("dotenv");
dotenv.config();
const stripe=require("stripe")(process.env.STRIPE_API_SECRET);

const namedErrorHandler=require("../utils/errorHandler");

exports.processPayment=async(req,res)=>{
    try{
        const myPayment=await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:"inr",
            metadata:{
                company:"ecom2"
            },
        })
        res.status(200).json({success:true,client_secret:myPayment.client_secret})
    }
    catch(err)
    {
        namedErrorHandler(err,res);
    }
}

exports.sendStripeApiKey=async(req,res)=>{
    try{
        res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}