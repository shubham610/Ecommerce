import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === undefined) {
    return <Loader />;
  }
  if (loading === false) {
    if (isAuthenticated === false || user === null) {
      return <Navigate to="/login" />;
    } else if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }
  return;
};

export default ProtectedRoute;
