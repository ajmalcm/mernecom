import React,{useState,useEffect} from 'react'
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Loading from '../loading/Loading';
import { clearErrors, resetPassword } from '../redux/actions/userAction';
import { toast } from 'react-toastify';
import Metadata from '../layout/Header/Metadata';

function ResetPassword() {
    const dispatch=useDispatch();
    const {loading,success,error}=useSelector(state=>state.forgotPassword);
    const [showPass,setShowpass]=useState({showNewPass:false,showConfirmPass:false});
    const [passwords,setPasswords]=useState({newPassword:"",confirmPassword:""});
    const {newPassword,confirmPassword}=passwords;
    const {showNewPass,showConfirmPass}=showPass;
    const {token}=useParams();
    const navigate=useNavigate();

    const onChangeHandler=(e)=>{
        setPasswords({...passwords,[e.target.name]:e.target.value})
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(resetPassword(token,passwords))
    }

    useEffect(()=>{
        if(error)
        {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success)
        {
            toast.success("New password set successfully");
            navigate("/login")
        }
    },[success,error,dispatch])

  return (
    <>
    {
        loading?<Loading/>:
        <>
        <Metadata title="RESET PASSWORD"/>
        <div className="updatePasswordContainer">
  <form onSubmit={submitHandler}>
    <h6>Set Password</h6>
    <div>
    <div><LockOpenIcon fontSize="small"/></div>
      <input type={showNewPass?"text":"password"} placeholder="New Password" value={newPassword} name="newPassword" onChange={onChangeHandler}/>
      <div className="showIcon" onClick={()=>setShowpass({...showPass,showNewPass:!showNewPass})}>{newPassword &&(showNewPass ?<VisibilityIcon fontSize="small"/>: <VisibilityOffIcon fontSize="small"/>) }</div>
    </div>
    <div>
    <div><LockIcon fontSize="small"/></div>
      <input type={showConfirmPass?"text":"password"} placeholder="Confirm Password" value={confirmPassword} name="confirmPassword" onChange={onChangeHandler}/>
      <div className="showIcon" onClick={()=>setShowpass({...showPass,showConfirmPass:!showConfirmPass})}>{confirmPassword &&(showConfirmPass ?<VisibilityIcon fontSize="small"/>: <VisibilityOffIcon fontSize="small"/>) }</div>
    </div>
    <button type="submit">UPDATE</button>
  </form>
</div>
        </>
        
    }
</>
  )
}

export default ResetPassword