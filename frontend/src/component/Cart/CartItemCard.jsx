import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <Fragment>
      <div className="cartItemCardBox">
        <div>
          <img src={item.image} alt="NotImg" />
        </div>
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price: ₹${item.price}`}</span>
          <p onClick={() => deleteCartItem(item.product)}>Remove</p>
        </div>
      </div>
    </Fragment>
  );
};

export default CartItemCard;
