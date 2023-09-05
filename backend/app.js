const express=require("express");
const app=express();
const product=require("./routes/productRoutes")
const user=require("./routes/userRoutes")
const order=require("./routes/orderRoutes")
const dbConnect=require("./config/dbConnect");
const cookieParser=require("cookie-parser");
const fileUpload=require("express-fileupload");
const bodyParser=require("body-parser");
const payment=require("./routes/paymentRoutes")
//connection
dbConnect();

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:true}))

//routes
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment)


module.exports=app;