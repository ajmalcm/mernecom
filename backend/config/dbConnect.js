const mongoose=require("mongoose");
const dotenv=require("dotenv")
dotenv.config();
const CONNECTION_STRING=process.env.CONNECTION_STRING;

const dbConnect=()=>{
    mongoose.connect(CONNECTION_STRING).
    then(()=>console.log("Connected to mongoDb"))
    // .catch((err)=>console.log({"error":err}))
}

module.exports=dbConnect;