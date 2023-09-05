const Order=require("../models/orderModel");
const Product=require("../models/productModel");
const namedErrorHandler = require("../utils/errorHandler");


//newOrder
exports.newOrder=async(req,res,next)=>{
    try{
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }=req.body;

        const order=await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            paidAt:Date.now(),
            itemsPrice,
            user:req.user._id,
            taxPrice,
            shippingPrice,
            totalPrice

        })

        res.status(200).json({
            success:true,
            message:"Order placed successfully.",
            order
        })

    }
    catch(err)
    {
        namedErrorHandler(err, res);
    }
}

//getSingleOrder
exports.getSingleOrder=async(req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id).populate("user","name email")
        //the above line is used to get name and email of the user from the UserModel by using the "user" reference from the orderModel

        if(!order)
        {
            return res.status(401).json({success:false,message:"No Order found with this id."})
        }

        res.status(200).json({
            success:true,
            order
        })
    }
    catch(err)
    {
        namedErrorHandler(err, res);
    }
}

//getMyorders

exports.getMyOrders=async(req,res,next)=>{
    try{
        const orders=await Order.find({user:req.user._id})
       
        res.status(200).json({
            success:true,
            orders
        })

    }
    catch(err)
    {
        namedErrorHandler(err, res);
    }
}

//getAllOrders-->admin

exports.getAllOrders=async(req,res,next)=>{
    try{
        const orders=await Order.find();
        let totalAmount=0;
        
        orders.forEach(or=>{
            totalAmount+=or.totalPrice
        })

        res.status(200).json({
            success:true,
            orders,
            totalAmount
        })
    }
    catch(err)
    {
        namedErrorHandler(err, res);
    }
}

//updateOrder-->admin

exports.updateOrder=async(req,res,next)=>{
    try{
        const {status}=req.body;

        const order=await Order.findById(req.params.id);
        if(!order)
        {
            return res.status(401).json({
                success:false,
                message:"No order found with this id."
            })
        }

        if(order.orderStatus==="Delivered")
        {
            return res.status(401).json({success:false,message:"Product has already been delivered."})
        }

        if(order.orderStatus==="Shipped")
        {
            order.orderItems.forEach(async(or)=>{
                await updateStock(or.product,or.quantity)
            })
        }

        order.orderStatus=status;

        if(order.orderStatus==="Delivered")
        {
            order.deliveredAt=Date.now();
        }

        await order.save({validateBeforeSave:false})

        res.status(200).json({
            success:true,
            message:"Order Updated successfully."
        })


    }
    catch(err)
    {
        namedErrorHandler(err, res);
    }
}

//deleteOrder-->admin

exports.deleteOrder=async(req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id);

        if(!order)
        {
            return res.status(401).json({
                success:false,
                message:"No order found with this id."
            })
        }

        await Order.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success:true,
            message:"Order deleted successfully."
        })
    }
    catch(err)
    {
        namedErrorHandler(err, res);
    }
    
}









//updateStock
async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.stock-=quantity;

    await product.save({validateBeforeSave:false})

}