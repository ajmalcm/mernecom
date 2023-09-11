import React, { useEffect, useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from '@mui/material';
import Loading from '../loading/Loading';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { toast } from 'react-toastify';
import { clearErrors, deleteReview, getAllReviews } from '../redux/actions/productAction';
import Metadata from '../layout/Header/Metadata';
import { DELETE_REVIEW_RESET } from '../redux/constants/productConstant';
const Reviews = () => {
    const dispatch=useDispatch();
    const {loading,error,reviews}=useSelector(state=>state.allReviews);
    const {loading:deleteLoading,error:deleteError,isDeleted}=useSelector(state=>state.review);
    const [productId,setProductId]=useState("");
    const columns = [
        {
          field: "id",
          headerName: "Review Id",
          minWidth: 150,
          flex: 0.6,
        },
        {
          field: "user",
          headerName: "User",
          minWidth: 150,
          flex: 0.6,
        },
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 150,
          flex: 0.4,
        },
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          cellClassName:(params)=>{
            return params.row.rating > 3
            ? "text-green-600"
            : "text-red-600";
        },
        },
        {
          field: "action",
          headerName: "Actions",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          sortable: false,
          renderCell: (params) => {
            let reviewId = params.row.id; // Assuming your data has an 'id' field
            return (
              <>
                <Button
                  className="text-black"
                  onClick={()=>deleteReviewHandler(reviewId)}
                >
                  <DeleteIcon className="hover:text-[#157ed2]" />
                </Button>
              </>
            );
          },
        },
      ];
    
      const rows = [];
    
      reviews &&
        reviews.forEach((item) => {
          rows.push({
            id: item._id,
            user: item.name,
            comment: item.comment,
            rating: item.rating,
          });
        });
        
        useEffect(()=>{
            if(error)
            {
                toast.error(error);
                dispatch(clearErrors())
            }
            if(deleteError)
            {
                toast.error(deleteError);
                dispatch(clearErrors())
            }
            if(isDeleted)
            {
                toast.success("Review Deleted successfully.");
                dispatch({type:DELETE_REVIEW_RESET})
                dispatch(getAllReviews(productId))
            }
        },[dispatch,error,isDeleted,deleteError])

        const submitHandler=(e)=>{
            e.preventDefault();
            if(productId.length!==24)
            {
                toast.error("Invalid Product id")
            }
            dispatch(getAllReviews(productId))
        }

        const deleteReviewHandler=(revId)=>{
            dispatch(deleteReview(productId,revId))
        }

  return (
    <>
        <Metadata title="Product-reviews" />

<div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3">
  <Sidebar />
  {loading || deleteLoading ? (
    <Loading />
  ) : (
    <div className="mt-6 flex flex-col flex-1 p-4 max-md:p-0 gap-8 w-[70%]">
      <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4 ">
        REVIEWS
      </h4>
      <form
            className="flex  items-center h-fit w-[50%] max-[820px]:w-[90%] max-[820px]:border-none max-[460px]:p-0 mx-auto  flex-col border-[1px] border-gray-200 px-10 py-8 gap-2 bg-white" onSubmit={submitHandler}>
      <div className="w-full relative">
              <StarBorderIcon className="absolute top-2 left-1" />
              <input
                type="text"
                placeholder="Enter Product id"
                className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
                value={productId}
                onChange={(e)=>setProductId(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full text-center p-2 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer"
              style={{ backgroundColor: "#157ed2" }}
            >
              SEARCH
            </Button>
        </form>
      {
        (reviews.length>0)?
      <div className="w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
      :<h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4 ">
        NO-REVIEWS
      </h4>}
    </div>
  )}
</div>
    </>
  )
}

export default Reviews