const User=require("../models/userModel");
const namedErrorHandler=require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail.js");
const crypto=require("crypto");
const cloudinary=require("cloudinary");
const dotenv=require("dotenv");
dotenv.config();
//register user
exports.registerUser=async(req,res)=>{
    try{
       const {name,email,password,confirmPassword,avatar}=req.body;

       const myCloud=await cloudinary.v2.uploader.upload(avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
       })

       const userExists=await User.findOne({email});

       if(userExists)
       {
       return res.status(500).json({success:false,message:"User with this email already exists."})
       }

       if(password!==confirmPassword){
        return res.status(500).json({success:false,message:"password and confirmPassword doesnt Match."})
       }

       const message=`<p>Dear ${name},</p></br>

       <p>Welcome to E-COMM! Shop with us for a world of exciting products, unbeatable prices, and exceptional service. Happy shopping 🤗!<p/><br/>
       
       <p>Warm regards,<p/>
       <p>AJMAL C M<p/>
       <p>E-COMM Team.<p/>`;


        try{
             sendEmail({
                email:email,
                subject:"Welcome to E-COMM - Your Ultimate Shopping Destination 😊 !",
                message,
                html: `<div><p style="color:black;">${message}</p><img src = "cid:myImg" style="width:400px;height:400px;"/></div>`,
                attachments: [{
                  filename: 'a6.jpg',
                  path: __dirname + '/a6.jpg',
                  cid: 'myImg'
                }]
            })
        }
        catch(err)
        {
            namedErrorHandler(err,res)
        }
       

       const user=await User.create({
        name,
        email,
        password,
        avatar:
        {
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
        });
       sendToken(user,200,res);
       
    }
    catch(err)
    {
        namedErrorHandler(err,res);
    }
}

//login user

exports.loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;


        if(!email || !password)
        {
            return res.status(501).json({success:false,message:"Please enter email and password."})
        }


        const user=await User.findOne({email}).select("+password");

        if(!user)
        {
            return res.status(401).json({success:false,message:"Invalid email or password."})
        }

        const isMatchedPassword=await user.comparePassword(password);

        if(!isMatchedPassword)
        {
            return res.status(401).json({success:false,message:"Invalid email or password."})
        }

       sendToken(user,200,res);

    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}


//logoutUser

exports.logoutUser=async(req,res,next)=>{
    try{

        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })

    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//forgot pssword

exports.forgotPassword=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});

        if(!user)
        {
            return res.status(404).json({success:false,message:"User not found."})
        }

        const resetToken=user.getResetPasswordToken();

        await user.save({validateBeforeSave:false});

        const resetPasswordUrl=`${process.env.FRONTEND_PORT}/password/reset/${resetToken}`;

        const message=`Your password rest token is \n\n ${resetPasswordUrl} \n\nIf you have not requested for this email then please ignore it.`;


        try{
            await sendEmail({
                email:user.email,
                subject:"Ecommerce password recovery",
                message
            })
        }
        catch(err)
        {
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save();

            namedErrorHandler(err,res)
        }

        res.status(201).json({
            success:true,
            message:`email sent to ${user.email}`
        })
    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//restPassword

exports.resetPassword=async(req,res,next)=>{
    try{
        const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{
                $gt:Date.now()
            }
        })

        if(!user)
        {
            return res.status(400).json({success:false,message:"reset token is invalid or expired"})
        }


        if(req.body.password !== req.body.confirmPassword)
        {
            return res.status(400).json({success:false,message:"passwords does not match."})
        }
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();

       sendToken(user,200,res);

    }

    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//getUserDetails

exports.getUserDetails=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);

        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}


//Update password

exports.updatePassword=async(req,res,next)=>{
    try{
        const {oldPassword,newPassword,confirmPassword}=req.body;


        const user=await User.findById(req.user.id).select("+password");

        const isPasswordMatched=await user.comparePassword(oldPassword);

        if(!isPasswordMatched)
        {
            return res.status(400).json({
                success:false,
                message:"Wrong Password entered."
            })
        }

        if(newPassword!==confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password does not match"
            })
        }

        user.password=newPassword
        await user.save();

       sendToken(user,200,res);
  

    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//update profile

exports.updateProfile=async(req,res,next)=>{
    try{
        const {name,email,avatar}=req.body;

        let userData={name,email};

        if(avatar!=="")
        {
            const user=await User.findById(req.user.id);

            const imageId=user.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageId);
            const myCloud=await cloudinary.v2.uploader.upload(avatar,{
                folder:"avatars",
                width:150,
                crop:"scale"
            })

            userData.avatar={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
            
        }

        //avatar will be doing later after setting up cloudinary

        const user=await User.findByIdAndUpdate(req.user.id,userData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user
        })

    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//get all users-->admin

exports.getAllUsers=async(req,res,next)=>{
    try{
        const users=await User.find();

        res.status(200).json({
            success:true,
            users
        })
    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//get single user details-->admin

exports.getSingleUserDetails=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"No user found with this id."
            })
        }

        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//updateUserRole-->admin
exports.updateUserRole=async(req,res,next)=>{
    try{
        const {name,email,role}=req.body;
        const userData={
            name,
            email,
            role
        }

        const user=await User.findByIdAndUpdate(req.params.id,userData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"No user found with this id."
            })
        }

        res.status(200).json({
            success:true,
            message:"User role updated successfully."
        })
    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}

//deleteUser-->admin

exports.deleteUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"No user found with this id."
            })
        }

        await cloudinary.v2.uploader.destroy(user.avatar.public_id)

        await User.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success:true,
            message:"User deleted successfully."
        })
    }
    catch(err)
    {
        namedErrorHandler(err,res)
    }
}


