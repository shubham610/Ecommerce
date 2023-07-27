import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItemsFromCart } from "../../actions/cartAction";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => dispatch(removeItemsFromCart(item.product))}>
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
