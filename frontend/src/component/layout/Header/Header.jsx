import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import MenuIcon from "../../../images/menu.png";
import SearchIcon from "@material-ui/icons/Search";
import OrderIcon from "@material-ui/icons/ShoppingBasket";
import ProfileIcon from "@material-ui/icons/AccountBox";
import { useSelector } from "react-redux";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };
  console.log(user);
  return (
    <Fragment>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        className="swipeableDrawer"
      >
        <Box
          sx={{ width: 260 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {isAuthenticated ? (
            <div className="profileDiv">
              <Link to="/me/update">
                <img src={user && user.avatar.url} alt="AvatarImg" />
              </Link>
              <div className="profileInfo">
                <Link to="/account">Nishant Argade</Link>
                <Link
                  to={user.role === "admin" ? "/admin/dashboard" : "/account"}
                >
                  <p>{user.role}</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="newUserProfileDiv">
              <p>Welcome to NishoShop</p>
              <Link to="/login">Login</Link>
            </div>
          )}
          <Divider />

          <div className="textLinks">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </div>
          <Divider />

          <div className="iconLinks">
            <Link to="/Search">
              <SearchIcon />
            </Link>
            <Link to="/orders">
              <OrderIcon />
            </Link>
            <Link to="/account">
              <ProfileIcon />
            </Link>
          </div>
        </Box>
      </SwipeableDrawer>

      <button className="Hamburger" onClick={toggleDrawer(true)}>
        <img src={MenuIcon} alt="" />
      </button>
    </Fragment>
  );
}

export default Header;
