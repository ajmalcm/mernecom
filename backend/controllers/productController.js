// const { query } = require("express");
const Product = require("../models/productModel");
const cloudinary=require("cloudinary");
const ApiFeatures = require("../utils/apiFeatures");
const namedErrorHandler = require("../utils/errorHandler");
//create products-->admin
exports.createProducts = async (req, res, next) => {
  try {

    let images=[];
    console.log(req.body["images[]"])
    if(typeof req.body["images[]"] === "string")
    {
      images.push(req.body["images[]"])
    }
    else
    {
      images=req.body["images[]"]
    }

    let imagesLink=[];

    for (let i = 0; i < images.length; i++) 
    {
      const result=await cloudinary.v2.uploader.upload(images[i],
        {
          folder:"products",
        })

        imagesLink.push({
          public_id:result.public_id,
          url:result.secure_url
        })
    }

    req.body.images=imagesLink
    req.body.user=req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    namedErrorHandler(err, res);
  }
};

  // getAll products for admin

  exports.getAdminProducts=async (req,res,next)=>{
    try{
        const products=await Product.find();

        res.status(200).json({
          success:true,
          products
        })
    }
    catch(err)
    {
      namedErrorHandler(err,res)
    }
  }

//getAllProducts
exports.getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage=8;
    const productCount=await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      // .pagination(resultPerPage);

      let products=await apiFeatures.query;

      const filteredProductsCount=products.length;

      apiFeatures.pagination(resultPerPage);

      products=await apiFeatures.query.clone();

    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
      filteredProductsCount
    });
  } catch (err) {
    namedErrorHandler(err, res);
  }
};

//updateProducts-->admin

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "Product not found with this id" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    namedErrorHandler(err, res);
  }
};

//deleteProducts-->admin

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found with this id.",
      });
    }

    await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (err) {
    namedErrorHandler(err, res);
  }
};

//getsingleProductDetails

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found with this id." });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    namedErrorHandler(err, res);
  }
};


//submit review or update review

exports.createReview=async(req,res,next)=>{
  try{
    const {productId,rating,comment}=req.body

    const review={
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment
    }

    const product=await Product.findById(productId);

    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

    if(isReviewed)
    {
      product.reviews.forEach(rev=>{
        if(rev.user.toString()===req.user._id.toString())
        rev.rating=rating,
        rev.comment=comment
      })
    }
    else{
      product.reviews.push(review)
      product.numOfReviews=product.reviews.length
    }

    let avg=0;

    product.reviews.forEach(rev=>{
      avg+=rev.rating
    })

    product.ratings=avg/product.reviews.length

    await product.save({validateBeforeSave:false})

    res.status(200).json({success:true,message:"review submitted successfully."})

  }
  catch(err)
  {
    namedErrorHandler(err, res);
  }
}

//getAllreviews of a product
exports.getAllReviews=async(req,res,next)=>{
  try{
    const pro=await Product.findById(req.query.id)
    if(!pro)
    {
      return res.status(401).json({success:false,message:"Product not found with this id."})
    }

    res.status(200).json({
      success:true,
      reviews:pro.reviews
    })

  }
  catch(err)
  {
    namedErrorHandler(err, res);
  }
}


//delete a review

  exports.deleteReview=async(req,res,next)=>{
    try{
      const product=await Product.findById(req.query.productId);

      if(!product)
      {
        return res.status(401).json({success:false,message:"Product not found with this id."})
      }

      const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());

      let avg=0;

      product.reviews.forEach(rev=>{
        avg+=rev.rating
      })

      product.reviews=reviews;
      product.numOfReviews=reviews.length
      product.ratings=avg/reviews.length

      await product.save({validateBeforeSave:false});

      res.status(200).json({
        success:true,
        message:"review deleted successfully."
      })
      


    }
    catch(err)
    {
    namedErrorHandler(err, res);
    }
  }

