import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "@mui/material";
import MetaData from "../layout/Header/MetaData";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product,
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, navigate, alert, error, isDeleted, deleteError]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 250, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.value.url}`}>
              <MdEdit />
            </Link>
            <Button onClick={() => deleteProductHandler(params.value.url)}>
              <MdDelete />
            </Button>
          </>
        );
      },
    },
  ];
  let rows = [];
  products &&
    products.forEach((item, index) => {
      rows.push({
        stock: item.stock,
        name: item.name,
        id: item._id,
        price: item.price,
        actions: { url: item._id },
      });
    });

  return (
    <>
      <MetaData title="All products --Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick={true}
            className="productListTable"
            // autoHeight
            autoPageSize
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
