import React from "react";
import "./Footer.css";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android or IOS device</p>
        <img src={playStore} alt="Play_Store" className="playStore" />
        <img src={appStore} alt="App_Store" className="appStore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; Shubham Bansal</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="/">YouTube</a>
        <a href="/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
