import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteProduct, getAdminProducts } from "../redux/actions/productAction";
import Loading from "../loading/Loading";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Metadata from "../layout/Header/Metadata";
import { DataGrid } from "@mui/x-data-grid";
import { DELETE_PRODUCT_RESET } from "../redux/constants/productConstant";
const AllProducts = () => {
  const {loading:allLoading, products, error } = useSelector((state) => state.products);
  const {error:deleteError,isDeleted,loading}=useSelector(state=>state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
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
      toast.success("PRODUCT DELETED SUCCESSFULLY.")
      dispatch({type:DELETE_PRODUCT_RESET})
    }
    dispatch(getAdminProducts());
  }, [error, dispatch,deleteError,isDeleted]);

  const deleteProductHandler=(id)=>{
    dispatch(deleteProduct(id))
  }

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 150,
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        const productId = params.row.id; // Assuming your data has an 'id' field
        return (
          <>
            <Link to={`/admin/product/${productId}`}>
              <EditIcon className="hover:text-[#157ed2]" />
            </Link>

            <Button className= "text-black" onClick={()=>deleteProductHandler(productId)}>
              <DeleteIcon className="hover:text-[#157ed2]"/>
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });


  return (
    <>
      <Metadata title="All products-admin" />
       
        <div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3">
          <Sidebar />
      {
          loading || allLoading ? (
        <Loading />
      ) : 
      (
          <div className="mt-6 flex flex-col flex-1 p-4 max-md:p-0 gap-8 w-[70%]">
          <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4 ">ALL-PRODUCTS</h4>
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
          </div>
      )}
        </div>
    </>
  );
};

export default AllProducts;
