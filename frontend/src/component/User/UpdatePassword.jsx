import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../Redux/actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../Redux/constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import usePasswordToggler from "./ShowHidePassword";
import { useHistory } from "react-router-dom";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const History = useHistory();
  const alert = useAlert();
  const [InputType1,Icon1] = usePasswordToggler();
  const [InputType2,Icon2] = usePasswordToggler();
  const [InputType3,Icon3] = usePasswordToggler();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfuly!");

      History.push("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, alert, error, History, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password -- NISHOSHOP" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type={InputType1}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span className="password-toogle-icon">{Icon1}</span>
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={InputType2}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span className="password-toogle-icon">{Icon2}</span>
                </div>{" "}
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type={InputType3}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="password-toogle-icon">{Icon3}</span>
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
