import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/actions/userAction";
import { useHistory } from "react-router-dom";

const UserOptions = ({ user }) => {
  const alert = useAlert();
  const History = useHistory();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    History.push("/admin/dashboard");
  }
  function orders() {
    History.push("/orders");
  }
  function account() {
    History.push("/account");
  }
  function cart() {
    History.push("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfuly!");
  }

  return (
    <Fragment>
      {
        <Fragment>
          <Backdrop open={open} style={{ zIndex: "10" }} />
          <SpeedDial
            style={{ zIndex: "11" }}
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            className="speedDial"
            icon={
              <img
                className="speedDialIcon"
                src={user.avatar ? user.avatar.url : "profile.png"}
                alt="profile"
              />
            }
          >
            {options.map((item) => (
              <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            ))}
          </SpeedDial>
        </Fragment>
      }
    </Fragment>
  );
};

export default UserOptions;
