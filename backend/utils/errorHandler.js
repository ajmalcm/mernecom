
// class ErrorHandler extends Error{
//     constructor(message,statusCode)
//     {
//         super(message);
//         this.statusCode=statusCode;

//         Error.captureStackTrace(this,this.constructor);
//     }
// }

const namedErrorHandler=(err,res)=>{
    //castError
    if(err.name==="CastError")
    {
        return res.status(400).json({success:false,message:`resource not found .invalid: ${err.message}`});
    }

    //duplicate key error
    if(err.code===11000)
    {
        return res.status(400).json({success:false,message:`Duplicate ${Object.keys(err.keyValue)} entered.`});
    }

    //jsonwebtoken error
    if(err.name==="JsonWebTokenError")
    {
        return res.status(400).json({success:false,message:`JsonWebToken is invalid. Try again`});
    }

    //jwtExpireError
    if(err.name==="TokenExpiredError")
    {
        return res.status(400).json({success:false,message:`JsonWebToken is expired. Try again`});
    }

    return res.status(400).json({success:false,message:err.message});
}
module.exports=namedErrorHandler

// module.exports=ErrorHandler;