import React from "react";
import { FaRegHandPointRight } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import "../../styles/navbar.css";
import "../../styles/style.css";
import "../../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="font">
        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a href="index.html">
                  <h4 className="arrow-footer">
                    <b>Arrow Publications Pvt. Ltd.</b>
                  </h4>
                </a>
                <div className="footer-about">
                  <p className="footer-address">
                    #C-11A & B, TSIIC, Moula-Ali Hyderabad - 500040 <br />{" "}
                    Telangana, India
                  </p>
                </div>
                {/* <h4 className="available-at">
                  Available At
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                    alt="amazon"
                    className="amazon"
                  />
                </h4> */}
              </div>
              <div className="col-md-3">
                <div className="useful-link">
                  <h2 className="quick">Quick Links</h2>

                  <div className="use-links">
                    <li>
                      <Link to="/">
                        <i className="fa-solid fa-angles-right" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fa-solid fa-angles-right" /> About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop">
                        <i className="fa-solid fa-angles-right" />
                        Shop By
                      </Link>
                    </li>
                    <li>
                      <Link to="/Contact">
                        <i className="fa-solid fa-angles-right" />
                        Contact Us
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
{/*
              <div className="col-md-2">
                <div className="useful-link-shop">
                  <h2 className="shopby">
                    <Link to="/Shop">Shop by</Link>
                  </h2>

                  <div className="use-links">
                    <li>
                      <Link to="/shop">
                        <i className="fa-solid fa-angles-right" /> Class
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop">
                        <i className="fa-solid fa-angles-right" /> Subject
                      </Link>
                    </li>
                  </div>
                </div>
              </div>*/}
              <div className="col-md-3">
                <div className="useful-link">
                  <h2 className="pay-online">Pay Online</h2>

                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1280px-PhonePe_Logo.svg.png"
                    alt="pay online"
                    className="pay-online-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="footer-hr" />
          <div className="footer-content">
            <h5 className="copywritename">
              &copy; Arrow Publications Pvt. Ltd. All Rights Reserved.
            </h5>
            <div className="social-media-links">
              <FaRegHandPointRight />
              <a href="https://www.facebook.com/" className="ms-2 links">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/" className="ms-2 links">
                <AiFillInstagram />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="ms-2 links"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.youtube.com/c/ArrowPublicationsPVTLTD"
                target="_blank"
                className="ms-2 links"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/company/arrowpublicationsindia-pvt-ltd"
                target="_blank"
                className="ms-2 links"
                rel="noreferrer"
              >
                <BsLinkedin />
              </a>
            </div>
          </div>
          <div className="social-media-links-mobile">
            <FaRegHandPointRight />
            <a href="https://www.facebook.com/" className="ms-2 links">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/" className="ms-2 links">
              <AiFillInstagram />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="ms-2 links"
            >
              <FaSquareXTwitter />
            </a>
            <a
              href="https://www.youtube.com/c/ArrowPublicationsPVTLTD"
              target="_blank"
              className="ms-2 links"
              rel="noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/company/arrowpublicationsindia-pvt-ltd"
              target="_blank"
              className="ms-2 links"
              rel="noreferrer"
            >
              <BsLinkedin />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
