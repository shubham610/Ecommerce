import React from "react";
import sample from "../../images/ecommerce.jpg";
import sample2 from "../../images/ecommerce2.jpg";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="aboutContainer">
        <div className="textContainer">
          <h1 className="aboutHeading">About Us</h1>
          <p>
            Welcome to Shopee, where shopping meets convenience and style. We
            are your one-stop destination for all ee things fashion, home decor,
            electronics, and more. At Shopp, our mission is to provide you with
            a seamless and enjoyable online shopping experience, whether you're
            browsing the latest fashion trends, upgrading your home, or
            searching for that perfect gift.
          </p>
          <p>
            Founded with a passion for innovation and a commitment to customer
            satisfaction, Shopee is dedicated to bringing you a curated
            selection of high-quality products from trusted brands. Our
            user-friendly interface, intuitive search features, and secure
            payment options ensure that you can shop with confidence. We're
            constantly evolving to stay ahead of the curve, so you can explore
            new arrivals, discover exclusive deals, and stay connected with the
            latest updates. Thank you for choosing Shopee as your online
            shopping destination, and we look forward to helping you find the
            perfect items to enhance your lifestyle.
          </p>
        </div>
        <div className="imagesContainer">
          <img src={sample} alt="Sample" />
          <img src={sample2} alt="Sample2" />
        </div>
      </div>
    </>
  );
};

export default About;
