import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import Loader from "../../component/layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import MetaData from "../layout/Header/MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails,
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview,
  );

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const addToCartHandler = () => {
    if (product.stock < 1) {
      alert.info("Product Out Of Stock");
      return;
    }
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", Number(rating));
    myForm.set("comment", comment);
    myForm.set("productId", params.id);
    dispatch(newReview(myForm));
    submitReviewToggle();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, reviewError, params.id, error, alert, success]);
  const options = {
    value: Number(product.ratings),
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="ProductDetails">
            <div className="pictures">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      src={item.url}
                      className="CarouselImage"
                      key={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="deatailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="details-block-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="details-block-3">
                <h1>₹{product.price}</h1>
                <div className="details-block-3-1">
                  <div className="details-block-3-1-1">
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input type="number" disabled={true} value={quantity} />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>{" "}
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "inStock"}
                  </b>
                </p>
              </div>
              <div className="details-block-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <div className="reviewsHeading">REVIEWS</div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={Number(rating)}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
