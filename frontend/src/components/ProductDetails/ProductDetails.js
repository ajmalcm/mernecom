import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { toast } from "react-toastify";
import { clearErrors, getproductDetail, newReview } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";
import Loading from "../loading/Loading";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReviewCard from "./reviewCard";
import Metadata from "../layout/Header/Metadata";
import { addtoCart } from "../redux/actions/cartAction";
import { CREATE_REVIEW_RESET } from "../redux/constants/productConstant";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );

  const {success,error:reviewError}=useSelector(state=>state.newReview);

  const [rating,setRating]=useState(0);
  const [comment,setComment]=useState("");
  const [open,setOpen]=useState(false);

  const { id } = useParams();
    const [qty,setQty]=useState(1);
  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const qtyIncrease=()=>{
    if(qty>=product.stock)
    return 
  else
  setQty(qty+1);
  }

  const qtyDecrease=()=>{
    if(qty<=1)
    return
  else
  setQty(qty-1)
  }

  const addToCartHandler=()=>{
    dispatch(addtoCart(id,qty))
    toast.success("Item added to cart successfully.")
  }

  const submitReviewToggle=()=>{
    open?setOpen(false):setOpen(true)
  }

  const reviewSubmitHandler=()=>{
    const reviewData={
      productId:id,
      rating,
      comment
    }
    dispatch(newReview(reviewData))
    setOpen(false);
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors())
    }
  if (reviewError)
  {
    toast.error(error);
      dispatch(clearErrors())
  }
  if(success)
  {
    toast.success("review submitted successfully.");
    dispatch({type:CREATE_REVIEW_RESET});
  }
    dispatch(getproductDetail(id));
  }, [dispatch, error,id,reviewError,success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
        <Metadata title={product?.name}/>
          <div className="sProductDetailContainer">
            <Carousel className="islider">
              {product?.images &&
                product?.images.map((item, index) => (
                  <img
                    className="carouselImages"
                    alt={`${index} slide`}
                    src={item.url}
                    key={item.url}
                  />
                ))}
            </Carousel>

            <div className="sProductDetail">
              <h2 className="sProductName">{product?.name}</h2>
              <span className="spid">#{product?._id}</span>
              <div className="sRating">
                <Rating {...options} />
                <span className="rev">({product.reviews?.length} reviews)</span>
              </div>
              <span className="avl">
                Availability:{" "}
                <span style={{ color: product.stock < 1 ? "red" : "green" }}>
                  {product.stock < 1 ? "Outof Stock" : "In Stock"}
                </span>
              </span>
              <span className="description">
                <p>Description :</p>
                {product.description} 
              </span>
              <div className="priceCnt">
                <h2 className="pDiscount">₹{product?.price}</h2>
                <h2 className="noDiscount">
                  <s>₹{product?.price + product?.price * 0.2}</s>
                </h2>
              </div>

              <div className="addToCartSection">
                <div className="qty">
                  <span>Qty:</span>
                  <span className="plusminus" onClick={qtyDecrease}>-</span>
                  <input type="number" readOnly defaultValue={1} min={1} value={qty}/>
                  <span className="plusminus" onClick={qtyIncrease}>+</span>
                </div>
                <button onClick={addToCartHandler} disabled={product.stock<1?true:false}>
                  <ShoppingCartIcon />
                  <span>ADD TO CART</span>
                </button>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>
            </div>
          </div>
                  <h3 className="reviewsHeading">REVIEWS</h3>

                  <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                  >
                    <DialogTitle >Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                      <Rating value={rating} onChange={(e)=>setRating(e.target.value)} size="large"/>
                      <textarea className="submitDialogTextArea" cols={30} rows={5} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    </DialogContent>
                    <DialogActions>
                      <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                      <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
                    </DialogActions>
                  </Dialog>

          <div className="allReviewsContainer">
                  {
                    product?.reviews && product?.reviews[0]?
                    product?.reviews.map((review,index)=>(
                      <ReviewCard key={index} review={review}/>
                    )):
                    <p className="noReviews">NO REVIEWS</p>
                  }
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
