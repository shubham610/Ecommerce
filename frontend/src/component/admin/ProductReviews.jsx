import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdStar } from "react-icons/md";
import { Button } from "@mui/material";
import MetaData from "../layout/Header/MetaData";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const alert = useAlert();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review,
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews,
  );

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, navigate, alert, error, isDeleted, deleteError, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 250, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.value >= 3 ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.value.url)}>
              <MdDelete />
            </Button>
          </>
        );
      },
    },
  ];
  let rows = [];
  reviews &&
    reviews.forEach((item, index) => {
      rows.push({
        rating: item.rating,
        user: item.name,
        id: item._id,
        comment: item.comment,
        actions: { url: item._id },
      });
    });

  return (
    <>
      <MetaData title="All Reviews --Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <MdStar />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <>
              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick={true}
                className="productListTable"
                // autoHeight
                autoPageSize
              />
            </>
          ) : (
            <>
              <h1 className="productReviewsFormHeading">Reviews Not Found</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
