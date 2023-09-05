const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const crypto=require("crypto");
dotenv.config();

const userModel=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter your name."],
        maxLength:[30,"Name should be within 30 charactrers long."],
        minLength:[4,"Name should be atleart 4 characters"]
    },
    email:{
        type:String,
        require:[true,"Please enter your email."],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email."]
    },
    password:{
        type:String,
        require:[true,"Please enter your password."],
        minLength:[8,"password should be atleart 8 characters"],
        select:false
    },
    avatar:{     //-->avatar is an object becouse it will only have a singre image
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userModel.pre("save",async function(next){ //-->will hash the password before saving into db

    if(!this.isModified("password")) //-->in case if password is not modified we dont want to hash the already hashed password
    {
        next();
    }

    this.password=await bcrypt.hash(this.password,10);
})

//to create jwt
userModel.methods.getJwtToken=function()
{
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


//compare password
userModel.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//getResetPasswordToken

userModel.methods.getResetPasswordToken=function()
{
    let resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=new Date(Date.now()+15*60*1000);

    return resetToken
}



module.exports=mongoose.model("User",userModel);