import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Metadata from "../layout/Header/Metadata";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../redux/actions/userAction";
import { Link } from "react-router-dom";
import { DELETE_USER_RESET } from "../redux/constants/useeConstants";
import Loading from "../loading/Loading";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.profile);
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (deleteError) {
      toast.error(deleteError);
      clearErrors();
    }
    if (isDeleted) {
      toast.success("User deleted successfully.");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "text-green-600" : "text-red-600";
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
        const userId = params.row.id; // Assuming your data has an 'id' field
        return (
          <>
            <Link to={`/admin/user/${userId}`}>
              <EditIcon className="hover:text-[#157ed2]" />
            </Link>

            <Button
              className="text-black"
              onClick={() => dispatch(deleteUser(userId))}
            >
              <DeleteIcon className="hover:text-[#157ed2]" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });

  return (
    <>
      <Metadata title="All Users-admin" />

      <div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3">
        <Sidebar />
        {loading || deleteLoading ? (
          <Loading />
        ) : (
          <div className="mt-6 flex flex-col flex-1 p-4 max-md:p-0 gap-8 w-[70%]">
            <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4 ">
              ALL-PRODUCTS
            </h4>
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

export default AllUsers;
