import React from "react";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const options = {
    value: Number(review.rating),
    readOnly: true,
    size: "small",
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img
        src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
        alt="User"
      />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
