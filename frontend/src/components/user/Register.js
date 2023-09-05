import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Profile from "../../imgs/prof.jpg";
import {useSelector,useDispatch} from "react-redux";
import { clearErrors, registerUser } from "../redux/actions/userAction";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import Metadata from "../layout/Header/Metadata";
// import "./LoginRegister.css"
export default function Register(){
    const [registerData,setRegisterData]=useState({registerName:"",registerEmail:"",registerPassword:"",registerConfirmPassword:"",avatar:""});
    const [avatarPreview,setAvatarpreview]=useState(Profile);
    const {registerName,registerEmail,registerPassword,registerConfirmPassword,avatar}=registerData;
    const {user,loading,isAuthenticated,error}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const onRegisterDataChange=(e)=>{

        if(e.target.name==="avatar")
        {
            const reader=new FileReader()

            reader.onload=()=>{
                if (reader.readyState===2)
                {
                    setAvatarpreview(reader.result);
                    setRegisterData({...registerData,[e.target.name]:reader.result})
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setRegisterData({...registerData,[e.target.name]:e.target.value});
        }
    }
const onRegisterSubmit=e=>{
    e.preventDefault();
    // console.log(registerData)
    dispatch(registerUser(registerData))
}

    useEffect(()=>{
       if(error)
       {
        toast.error(error);
        dispatch(clearErrors())
       }
       if(isAuthenticated)
       {
        toast.success("Register Success.");
        navigate("/")
       }
    },[error,dispatch,isAuthenticated])

    return(
        <>
            {
                loading?
                <Loading/>
                :
                <>
                <Metadata title="REGISTER"/>
                <div className="formContainer">
            
            <form className="form" encType="multipart/form-data" onSubmit={onRegisterSubmit}>
            <p className="title">Register </p>
            <p className="message">Signup now and get full access to our app. </p>
                <label>
                    <input required="" placeholder="" type="text" className="input" value={registerName} name="registerName" onChange={onRegisterDataChange}/>
                    <span>Firstname</span>
                </label>
                
            <label>
                <input required="" placeholder="" type="email" className="input" value={registerEmail} name="registerEmail" onChange={onRegisterDataChange}/>
                <span>Email</span>
            </label> 
                
            <label>
                <input required="" placeholder="" type="password" className="input" value={registerPassword} name="registerPassword" onChange={onRegisterDataChange}/>
                <span>Password</span>
            </label>
            <label>
                <input required="" placeholder="" type="password" className="input" value={registerConfirmPassword} name="registerConfirmPassword" onChange={onRegisterDataChange}/>
                <span>Confirm password</span>
            </label>
            <div className="avatar">
               <img alt="not found" src={avatarPreview}/>
               <input type="file" accept="image/*" name="avatar" onChange={onRegisterDataChange}/>
            </div>
            <button className="submit" type="submit">Submit</button>
            <p className="signin">Already have an acount ? <Link to="/login">LogIn</Link> </p>
        </form>
           </div>
                </>
               
            }
        </>
        
             
    )
}