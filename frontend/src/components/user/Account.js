import React, { useEffect } from "react";
import "./Account.css";
import Metadata from "../layout/Header/Metadata";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
const Account = () => {
  const { loading, isAuthenticated,user } = useSelector((state) => state.user);
  const navigate=useNavigate();

  useEffect(()=>{
    if(!isAuthenticated)
    {
        navigate("/login")
    }
  },[isAuthenticated,navigate])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="profileContainer">
          <Metadata title={`${user?.name}'s profile`} />
          <div className="proctn">
          <div className="proctnCont">
            <div>
              <h1>My Profile</h1>
              <img src={user?.avatar?.url} alt={user?.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substring(0, 10)}</p>
              </div>
              <div className="orderNcpass">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
