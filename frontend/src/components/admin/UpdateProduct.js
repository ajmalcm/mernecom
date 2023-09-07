import React, { useEffect, useState } from "react";
import Metadata from "../layout/Header/Metadata";
import Sidebar from "./Sidebar";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Loading from "../loading/Loading";
import { clearErrors, getproductDetail, updateProduct } from "../redux/actions/productAction";
import { toast } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "../redux/constants/productConstant";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const { loading, error, product } = useSelector((state) => state.productDetail);
    const { loading:updateLoading, error:updateError, isUpdated } = useSelector((state) => state.product);

    const [productDetails, setProductDetails] = useState({
        name: product?.name,
        price: product?.price,
        description: product?.description,
        category: product?.category,
        stock: product?.stock,
      });
      const [pimages, setImages] = useState(product?.images);
      const [imagesPrev, setImagesPrev] = useState(product?.images);
      const { name, price, description, category, stock } = productDetails;
      const dispatch = useDispatch();
    
      const onChangeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
      };
    
      const onImagesChange = (e) => {
        let files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPrev([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImages((old) => [...old, reader.result]);
              setImagesPrev((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
    
      const cate = [
        "Men",
        "Women",
        "Laptop",
        "Mobile",
        "Formal",
        "Casual",
        "Books",
        "Medics",
        "Football",
        "Basketball",
        "Table",
        "Chair",
      ];
    
      const submitHandler = (e) => {
        e.preventDefault();
        let prodetails={...productDetails,images:pimages}
        // console.log(prodetails)
        dispatch(updateProduct(id,prodetails));
      };
    
      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
        if(updateError)
        {
            toast.error(updateError);
            dispatch(clearErrors()); 
        }
        if (isUpdated) {
          toast.success("Product Updated successfully.");
            navigate('/admin/allproducts');
          dispatch({ type: UPDATE_PRODUCT_RESET });
        }
        dispatch(getproductDetail(id))
      }, [dispatch, error,isUpdated,updateError,id ]);
  return (
    <>
    <Metadata title={`Product-Update-${product.name}`} />
    {loading || updateLoading ? (
      <Loading />
    ) : (
      <div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3">
        <Sidebar />
        <div className="mt-6 flex flex-1 flex-col p-4 max-md:p-0 gap-8 max-[460px]:p-1 max-[460px]:mt-2">
          <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4">
            UPDATE PRODUCT
          </h4>
          {/* <div className=""> */}
          <form
            className="flex  items-center flex-1 w-[50%] max-[820px]:w-[90%] max-[820px]:border-none max-[460px]:p-0 mx-auto  flex-col border-[1px] border-gray-200 px-10 py-8 gap-2 bg-white"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-barlow font-[300] tracking-wide text-black text-center pb-3 border-b border-[#ddd]">
              Product Info
            </h2>
            <div className="w-full relative">
              <SpellcheckIcon className="absolute top-2 left-1" />
              <input
                type="text"
                placeholder="Name"
                className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
                name="name"
                value={name}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full relative">
              <CurrencyRupeeIcon className="absolute top-2 left-1" />
              <input
                type="number"
                placeholder="Price"
                className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
                name="price"
                value={price}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full relative">
              <DescriptionIcon className="absolute top-2 left-1" />
              <input
                type="text"
                placeholder="Description"
                className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
                name="description"
                value={description}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full relative">
              <AccountTreeIcon className="absolute top-2 left-1" />
              <select
                className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
                name="category"
                value={category}
                onChange={onChangeHandler}
              >
                <option>select category</option>
                {cate.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </select>
            </div>
            <div className="w-full relative">
              <InventoryOutlinedIcon className="absolute top-2 left-1" />
              <input
                type="number"
                placeholder="Stock"
                name="stock"
                className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
                value={stock}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full">
              <input
                type="file"
                className="w-full text-center"
                multiple
                accept="image/*"
                name="images"
                onChange={onImagesChange}
              />
            </div>
            <div className="w-full flex gap-4 items-center overflow-auto">
              {imagesPrev&&imagesPrev.map((pr, i) => (
                <img
                  src={pr?.url?pr.url:pr}
                  alt={i}
                  key={i}
                  className="object-contain w-[75px] h-[75px] shadow-md"
                />
              ))}
            </div>
            <Button
              type="submit"
              className="w-full text-center p-2 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer"
              style={{ backgroundColor: "#157ed2" }}
              // disabled={state?"false":"true"}
            >
              UPDATE
            </Button>
          </form>
          {/* </div> */}
        </div>
      </div>
    )}
  </>
  )
}

export default UpdateProduct