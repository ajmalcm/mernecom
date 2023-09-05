import React, { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { clearErrors, forgotPassword } from "../redux/actions/userAction";
import { toast } from "react-toastify";
import Metadata from "../layout/Header/Metadata";
function Forgotpassword() {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Forgot-password" />
          <div className="updatePasswordContainer">
            <form onSubmit={submitHandler}>
              <h6>Forgot Password</h6>
              <div>
                <div>
                  <MailOutlineIcon fontSize="small" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="showIcon"></div>
              </div>
              <button type="submit">SEND</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Forgotpassword;
