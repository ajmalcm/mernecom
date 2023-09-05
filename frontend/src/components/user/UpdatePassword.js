import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useSelector, useDispatch } from "react-redux";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { clearErrors, updatePassword } from "../redux/actions/userAction";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import { UPDATE_PROFILE_RESET } from "../redux/constants/useeConstants";
import Metadata from "../layout/Header/Metadata";
function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [showPass, setShowpass] = useState({
    showOldPass: false,
    showNewPass: false,
    showConfirmPass: false,
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { showOldPass, showNewPass, showConfirmPass } = showPass;
  const { oldPassword, newPassword, confirmPassword } = password;

  const onChangeHandler = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated Successfully.");
      navigate("/account");
    }
    dispatch({ type: UPDATE_PROFILE_RESET });
  }, [error, isUpdated, dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Update password" />
          <div className="updatePasswordContainer">
            <form onSubmit={submitHandler}>
              <h6>Update Password</h6>
              <div>
                <div>
                  <KeyIcon fontSize="small" />
                </div>
                <input
                  type={showOldPass ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  name="oldPassword"
                  onChange={onChangeHandler}
                />
                <div
                  className="showIcon"
                  onClick={() =>
                    setShowpass({ ...showPass, showOldPass: !showOldPass })
                  }
                >
                  {oldPassword &&
                    (showOldPass ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    ))}
                </div>
              </div>
              <div>
                <div>
                  <LockOpenIcon fontSize="small" />
                </div>
                <input
                  type={showNewPass ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  name="newPassword"
                  onChange={onChangeHandler}
                />
                <div
                  className="showIcon"
                  onClick={() =>
                    setShowpass({ ...showPass, showNewPass: !showNewPass })
                  }
                >
                  {newPassword &&
                    (showNewPass ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    ))}
                </div>
              </div>
              <div>
                <div>
                  <LockIcon fontSize="small" />
                </div>
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onChangeHandler}
                />
                <div
                  className="showIcon"
                  onClick={() =>
                    setShowpass({
                      ...showPass,
                      showConfirmPass: !showConfirmPass,
                    })
                  }
                >
                  {confirmPassword &&
                    (showConfirmPass ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    ))}
                </div>
              </div>
              <button type="submit">UPDATE</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default UpdatePassword;
