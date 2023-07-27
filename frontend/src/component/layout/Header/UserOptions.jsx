import React, { useState } from "react";
import "./Header.css";
import { Backdrop } from "@mui/material";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { MdDashboard, MdPerson, MdExitToApp, MdListAlt } from "react-icons/md";
import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logOut } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { CgShoppingCart } from "react-icons/cg";
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const options = [
    { icon: <MdListAlt />, name: "Orders", func: orders },
    { icon: <MdPerson />, name: "Profile", func: account },
    {
      icon: (
        <Badge color="info" variant="dot" badgeContent={cartItems.length}>
          <CgShoppingCart />
        </Badge>
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <MdExitToApp />, name: "LogOut", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logOut());
    alert.success("LoggedOut Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        className="speedDial"
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            alt="profile"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            key={item.name}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
