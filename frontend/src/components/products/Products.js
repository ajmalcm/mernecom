import React, { useEffect,useState } from "react";
import "./Products.css";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../redux/actions/productAction";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import Treeview from "../home/Treeview";
import Metadata from "../layout/Header/Metadata";
// import Pagination from "react-js-pagination"
import { Pagination, Slider, Typography } from "@mui/material";
function Products() {
  const {keyword}=useParams();
  const dispatch = useDispatch();
  const { loading, products, error,resultPerPage,filteredProductsCount } = useSelector((state) => state.products);
  const [currentPage,setCurrentpage]=useState(1);
  const [price,setPrice]=useState([0,25000]);
  const [ratings,setRatings]=useState();
  const [category,setCategory]=useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch,error,keyword,currentPage,price,category,ratings]);

  const priceHandler=(e)=>{
    setPrice(e.target.value)
  }

  const Category = [
    {
      name: "Clothing",
      sub: [{ sub1: "Men" }, { sub1: "Women" }],
      icon: ShoppingBagOutlinedIcon,
    },
    {
      name: "Electronics",
      sub: [{ sub1: "Laptop" }, { sub1: "mobile" }],
      icon: ComputerOutlinedIcon,
    },
    {
      name: "Shoes",
      sub: [{ sub1: "Casual" }, { sub1: "Formal" }],
      icon: PetsOutlinedIcon,
    },
    {
      name: "Health",
      sub: [{ sub1: "Books" }, { sub1: "Medics" }],
      icon: Diversity1OutlinedIcon,
    },
    {
      name: "Sports",
      sub: [{ sub1: "Football" }, { sub1: "Basketball" }],
      icon: SportsSoccerOutlinedIcon,
    },
    {
      name: "Daily needs",
      sub: [{ sub1: "Books" }, { sub1: "Medics" }],
      icon: DeckOutlinedIcon,
    },
  ];

  console.log(category)

  return (
  <>
  {
    loading ? <Loading /> :
    <div className="homeContainer">
      <Metadata title="PRODUCTS" />
      <div className="homeLeft">

      <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              marks={true}
              step={500}
              min={0}
              max={25000}
              />
        </div>

        <div className="categoryTree">
          <div className="categoryHeader">
            <MenuIcon />
            <span>Categories</span>
          </div>
          <div>
            {Category.map((item, index) => (
              <Treeview
                main={item.name}
                sub={item.sub}
                Icon={item.icon}
                key={index}
                lb={index === Category.length - 1 ? "0 0 10px 10px" : "none"}
                ctgr={category}
                setCtgr={setCategory}
              />
            ))}
          </div>
          </div>


          <div className="ratingsFilter">
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  min={0}
                  max={5}
                  marks={true}
                  step={1}
                  aria-labelledby="continous-slider"
                  value={ratings}
                  valueLabelDisplay="auto"
                  onChange={(e,value)=>setRatings(value)}
                />
              </fieldset>
        </div>

       

        {/* <div className="homeLeft2">
          <span>Product Tags</span>
          <div className="tagContainer">
            <span>Phone</span>
            <span>Vest</span>
            <span>Mobile</span>
            <span>Laptop</span>
            <span>Toys</span>
            <span>Shirts</span>
            <span>Pants</span>
            <span>Sports</span>
            <span>Football</span>
            <span>Boots</span>
          </div>
        </div> */}

        {/* <div className="homeLeft3">
          <span>Manufactures</span>
          <div className="mnfContainer">
            <span>Nike</span>
            <span>Addidas</span>
            <span>Puma</span>
            <span>Luis Vuitton</span>
            <span>H&M</span>
            <span>Roadster</span>
            <span>Urban Monkey</span>
          </div>
        </div> */}
      </div>

      <div className="homeRight">
        {/* <div className="rightTop">
          <Carousel />
        </div> */}
        <div className="rightBottom">
          <div className="rightBottomHeader">
            <h3>Products</h3>
            <div className="smHeader">
              <span>all</span>
              <span>clothing</span>
              <span>Electronics</span>
              <span>shoes</span>
            </div>
          </div>
          <div className="homeProductConatiner">
          {
            products&&
            products.map((item,index)=>(
            <ProductCard product={item} key={index}/>
            ))
          }
          </div>
          {
            resultPerPage < filteredProductsCount &&
          <div className="paginationBox" style={{display:"flex",justifyContent:"center"}}>
          <Pagination 
          count={Math.ceil(filteredProductsCount/resultPerPage)} 
          page={currentPage} 
          onChange={(e,value)=>setCurrentpage(value)}/>
          </div>
          }
        </div>
      </div>
    </div>
    }</>
);
}

export default Products;
