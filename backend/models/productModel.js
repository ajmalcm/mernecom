const mongoose=require("mongoose");

const productModal=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the product name."],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter the product descritption."],
    },
    price:{
        type:Number,
        required:[true,"Please enter the product price."],
        maxLength:[8,"Price cannot exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[{  //--> its an array of objects becouse a product images will contain multiple images
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"Please select the category of the product."]
    },
    size:{
        type:String,
        required:[true,"PLease select the size of the product."],
    },
    stock:{
        type:Number,
        required:[true,"Please enter the Number of stocks."],
        maxLength:[4,"Stock cannot exceed 4 characters."],
        default:1
    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
    reviews:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,

            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true,
            }

        }
    ],
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("Product",productModal)