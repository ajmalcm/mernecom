import React, { useEffect, useState } from "react";
import "./LoginRegister.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../redux/actions/userAction";
import { toast } from "react-toastify";
import { UPDATE_PROFILE_RESET } from "../redux/constants/useeConstants";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import Metadata from "../layout/Header/Metadata";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [updateData, setUpdatedata] = useState({
    updateName: "",
    updateEmail: "",
    updateAvatar: user?.avatar?.url,
  });
  // const [avatarPreview,setAvataPreview]=useState(user?.avatar?.url);
  const { updateName, updateEmail, updateAvatar } = updateData;

  const onUpdateSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(updateData));
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "updateAvatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          // setAvataPreview(reader.result);
          setUpdatedata({ ...updateData, [e.target.name]: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUpdatedata({ ...updateData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (user) {
      // dispatch(loadUser());
      setUpdatedata({
        ...updateData,
        updateName: user?.name,
        updateEmail: user?.email,
      });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully.");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, user, navigate, isAuthenticated,updateData]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Update Profile" />
          <div className="formContainer">
            <form className="form" onSubmit={onUpdateSubmit}>
              <p className="title">Update Profile</p>
              <label>
                <input
                  required=""
                  placeholder=""
                  type="email"
                  className="input"
                  name="updateEmail"
                  value={updateEmail}
                  onChange={onChangeHandler}
                />
                <span>Email</span>
              </label>
              <label>
                <input
                  required=""
                  placeholder=""
                  type="text"
                  className="input"
                  name="updateName"
                  value={updateName}
                  onChange={onChangeHandler}
                />
                <span>Name</span>
              </label>
              <div className="avatar">
                <img alt="not found" src={updateAvatar} />
                <input
                  type="file"
                  accept="image/*"
                  name="updateAvatar"
                  onChange={onChangeHandler}
                />
              </div>
              <button className="submit" type="submit">
                Update
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
