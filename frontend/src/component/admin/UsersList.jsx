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
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, navigate, alert, error, isDeleted, deleteError, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 250, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 270,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "admin" ? "greenColor" : "redColor";
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
            <Link to={`/admin/user/${params.value.url}`}>
              <MdEdit />
            </Link>
            <Button onClick={() => deleteUserHandler(params.value.url)}>
              <MdDelete />
            </Button>
          </>
        );
      },
    },
  ];
  let rows = [];
  users &&
    users.forEach((item, index) => {
      rows.push({
        email: item.email,
        name: item.name,
        id: item._id,
        role: item.role,
        actions: { url: item._id },
      });
    });

  return (
    <>
      <MetaData title="All Users --Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
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

export default UserList;
