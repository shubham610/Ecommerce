import React from "react";
import "./Contact.css";
import contact from "../../images/contactUs.jpg";
import { SocialIcon } from "react-social-icons";
import { CgProfile } from "react-icons/cg";
import { MdEmail, MdMessage } from "react-icons/md";
const Contact = () => {
  return (
    <>
      <div className="contactContainer">
        <h1 className="contactHeading">Conatct Us</h1>
        <div className="grid">
          <div className="contactUsSocial">
            <div className="image">
              <img src={contact} alt="Contact-US" />
            </div>
            <div className="icons">
              <SocialIcon network="instagram" />
              <SocialIcon network="facebook" />
              <SocialIcon network="linkedin" />
            </div>
          </div>
          <div className="contactUsForm">
            <form
              action="https://getform.io/f/ddbf757d-cc0f-406b-bdbc-7c6d4892e457"
              method="post"
              className="form"
            >
              <div className="formName">
                <CgProfile />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className=""
                />
              </div>
              <div className="formEmail">
                <MdEmail />
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className=""
                />
              </div>
              <div className="formMessage">
                <MdMessage />
                <textarea
                  name="message"
                  rows="10"
                  placeholder="Enter your message"
                  className=""
                ></textarea>
              </div>

              <button type="submit" id="formBtn">
                Ask Us!
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
