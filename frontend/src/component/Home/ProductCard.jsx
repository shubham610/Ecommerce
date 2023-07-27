import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const Product = ({ product }) => {
  const options = {
    value: Number(product.ratings),
    readOnly: true,
    size: "small",
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} key={product._id} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardspan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Product;
