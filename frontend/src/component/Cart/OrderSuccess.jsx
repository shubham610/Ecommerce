import React from "react";
import "./OrderSuccess.css";
import { MdCheckCircle } from "react-icons/md";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <MdCheckCircle />
      <Typography>Your Order as been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
