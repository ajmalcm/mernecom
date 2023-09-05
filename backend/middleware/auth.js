const namedErrorHandler = require("../utils/errorHandler")
const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

exports.isAuthenticatedUser=async (req,res,next)=>{
    try{
        const {token}=req.cookies;

        if(!token)
        {
            return res.status(401).json({success:false,message:"Please login to access the resource."})
        }

        const decodedData= jwt.verify(token,process.env.JWT_SECRET);

        req.user=await User.findById(decodedData.id);
        next();

    }
    catch(err)
    {
        namedErrorHandler(err,res);
    }
}

exports.authorizeRoles=(...roles)=>{
return(req,res,next)=>{
    if(!roles.includes(req.user.role))
    {
        return res.status(403).json({success:false,message:`${req.user.role} cannot access this resource.`});
    }
    next();
}
}