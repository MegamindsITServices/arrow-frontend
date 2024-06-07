import React, { useEffect, useState } from "react";
import "../../styles/style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";
import "../../styles/subnav.css";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import "../../styles/header.css";
import SearchInput from "../Form/SearchInput";
import ToggleSearch from "../Form/ToggleSearch";
import axios from "axios";

// import ToggleSearch from "../Form/ToggleSearch";
// import SearchModal from "../Form/SearchModal";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [ok, setOk] = useState(false);

  const navigate = useNavigate();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  // const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    localStorage.clear();
    setCart([]);
    toast.success("Logout Successfully");
  };
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };
  const handleCartClick = () => {
    navigate("/cart");
    window.location.reload();
  };

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return (
    <>
      <div className="desktop-view">
        <div className="first">
          <div className="phone-mail">
            <h6 className="header-phone ">
              <FaPhoneAlt />
              +91- <span>910099026</span>
            </h6>

            <h6 className="header-mail ms-2">
              <IoMailSharp />
              <span className="ms-1">mail@arrowpublicationsindia.com</span>
            </h6>
          </div>
          <div className="search-container">
            <SearchInput />
          </div>

          <NavLink onClick={handleCartClick}>
            <Badge count={cart?.length} className="ms-2">
              <BsCart4 className="cart-button" />
            </Badge>
          </NavLink>

          {!ok && (
            <>
              <NavLink to="/signup">
                <button className="header-signup ms-4">
                  <FaRegPenToSquare className="icon" />
                  <span className="reg">Register</span>
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className="header-login">
                  <IoIosLock className="icon" />
                  <span className="sign"> Login</span>
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="mobile">
        <div class="header">
          <div class="phone-mail">
            <h6 class="header-phone">
              <FaPhoneAlt /> +91-9100999026
            </h6>
            <h6 class="header-mail">
              <IoMailSharp /> <span>mail@arrowpublicationsindia.com</span>
            </h6>
          </div>
          <div class="action-buttons">
            <div class="search-container">
              <SearchInput />
            </div>
            <NavLink
             onClick={handleCartClick}
              className="cart-wrapper"
            >
              <Badge count={cart?.length} class="ms-3 ">
                <BsCart4 class="cart-button" />
              </Badge>
            </NavLink>
            {!ok && (
              <>
                <NavLink to="/signup">
                  <button class="header-signup">
                    <FaRegPenToSquare class="icon" />
                    Register
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button class="header-login">
                    <IoIosLock class="icon" />
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html">
            <img
              src="https://arrowpublicationsindia.com/wp-content/uploads/2019/12/logo-new.png"
              alt=""
              className="arrow-logo-nav"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-1">
              <li>
                <NavLink
                  exact
                  activeClassName="active-link"
                  className="nav-link "
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <div className="dari">|</div>
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowAboutDropdown(true)}
                onMouseLeave={() => setShowAboutDropdown(false)}
              >
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/about"
                  role="button"
                >
                  About Us
                </NavLink>
                <ul
                  className={`dropdown-menu ${showAboutDropdown ? "show" : ""}`}
                >
                  <li>
                    <NavLink to="/Growpath" className="dropdown-item">
                      Growth Path
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/team-Arrow" className="dropdown-item mt-2">
                      Team Arrow
                    </NavLink>
                  </li>
                </ul>
              </li>
              <div className="dari">|</div>
              {/* <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowShopDropdown(true)}
                onMouseLeave={() => setShowShopDropdown(false)}
              >
                <a className="nav-link dropdown-toggle" role="button">
                  Shop by
                </a>
                <ul
                  className={`dropdown-menu ${showShopDropdown ? "show" : ""}`}
                >
                  <li>
                    <NavLink to="/shop" className="dropdown-item">
                      Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/class" className="dropdown-item mt-2">
                      Class
                    </NavLink>
                  </li>
                </ul>
              </li> */}
              <li>
                <NavLink
                  activeClassName="active-link"
                  to="/shop"
                  className="nav-link"
                >
                  Shop by
                </NavLink>
              </li>
              {/* <div className="dari">|</div> */}
              {/* <li>
                <NavLink
                  activeClassName="active-link"
                  to="/dealer_network"
                  className="nav-link"
                >
                  Arrow Executives
                </NavLink>
              </li> */}
              <div className="dari">|</div>
              <li>
                <NavLink
                  activeClassName="active-link"
                  to="/read_grow"
                  className="nav-link"
                >
                  Read and Grow
                </NavLink>
              </li>
              <div className="dari">|</div>
              <li>
                <NavLink
                  activeClassName="active-link"
                  to="/e_resources"
                  className="nav-link"
                >
                  E-resources
                </NavLink>
              </li>
              <div className="dari">|</div>
              <li>
                <NavLink
                  activeClassName="active-link"
                  to="/arrow_activity"
                  className="nav-link"
                >
                  Arrow Activity
                </NavLink>
              </li>
              <div className="dari">|</div>
              <li>
                <NavLink
                  activeClassName="active-link"
                  to="/contact"
                  className="nav-link"
                >
                  Contact Us
                </NavLink>
              </li>
              <div className="dari-drop">|</div>
              {!auth?.user ? (
                <></>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="active-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      <strong>{auth?.user?.name}</strong>
                    </NavLink>

                    <ul className="dropdown-menu ">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li></li>
                </>
              )}
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
