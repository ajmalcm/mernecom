import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Metadata from '../layout/Header/Metadata'
import Loading from '../loading/Loading'
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, updateUser, userDetails } from '../redux/actions/userAction';
import { Button } from '@mui/material';
import { UPDATE_USER_RESET } from '../redux/constants/useeConstants';
const UpdateUser = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();
    const {loading,error,user}=useSelector(state=>state.userDetails);
    const {loading:updateLoading,error:updateError,isUpdated}=useSelector(state=>state.profile);
    const [userDetail,setUserDetails]=useState({name:"",email:"",role:""});
    const {name,email,role}=userDetail;

    useEffect(()=>{
        dispatch(userDetails(id))
            setUserDetails({name:user.name,email:user.email,role:""})
        if(error)
        {
            toast.error(error);
            dispatch(clearErrors())
        }
        if(updateError)
        {
            toast.error(updateError);
            dispatch(clearErrors())
        }
        if(isUpdated)
        {
          toast.success("User Updated Successfully.")
          dispatch({type:UPDATE_USER_RESET})
          navigate("/admin/users")
        }

    },[dispatch,error,id,user.name,user.email,updateError,isUpdated])

    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(updateUser(id,userDetail));
    }

    const onChangeHandler=(e)=>{
        setUserDetails({...userDetail,[e.target.name]:e.target.value});
    }

  return (
    <>
     <Metadata title="Update-User-admin" />
        <div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3">
          <Sidebar />
      {loading || updateLoading ? (
        <Loading />
      ) : (
          <div className="mt-6 flex flex-1 flex-col p-4 max-md:p-0 gap-8 max-[460px]:p-1 max-[460px]:mt-2">
            <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4">
              UPDATE USER
            </h4>
            {/* <div className=""> */}
            <form
              className="flex  items-center flex-1 w-[50%] max-[820px]:w-[90%] max-[820px]:border-none max-[460px]:p-0 mx-auto  flex-col px-10 py-8 gap-2 bg-white"
              onSubmit={submitHandler}
            >
              <h2 className="text-2xl font-barlow font-[300] tracking-wide text-black text-center pb-3 border-b border-[#ddd]">
                User Details
              </h2>
              <div className="w-full relative">
                <PersonIcon className="absolute top-2 left-1" />
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
                <EmailOutlinedIcon className="absolute top-2 left-1" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="w-full relative">
                <VerifiedUserIcon className="absolute top-2 left-1" />
                <select value={role} onChange={onChangeHandler} name="role" className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none">
                <option value="">Choose Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full text-center p-2 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer"
                style={{ backgroundColor: "#157ed2" }}
                disabled={loading || role.length===0?true:false}
              >
                UPDATE
              </Button>
            </form>
            {/* </div> */}
          </div>
      )}
        </div>
    </>
  )
}

export default UpdateUser