import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import "../styles/button.css";
import "../styles/style.css";
import "../styles/hero.css";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import { Prices } from "../components/Prices";
import { useAuth } from "../context/Auth";
import "../styles/shop.css";
import { TfiViewListAlt } from "react-icons/tfi";
import { MdOutlineCalendarViewMonth } from "react-icons/md";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubject, setSelectSubject] = useState("");
  const [selectRadio, setSelectRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [viewMode, setViewMode] = useState("list");
  const [newCountFull, setNewCountFull] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [countTotal, setCountTotal] = useState(1);
  const [limit, setLimit] = useState(48);
  const [searchParams, setSearchParams] = useSearchParams();
  const [jumpPage, setJumpPage] = useState();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/subject/subjects");
      if (data?.success) {
        setSubjects(data?.subject);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getAllSubjects();
    getTotal();
  }, []);

  const getAllProduct = async (pageNumber = page, limit = 48) => {
    try {
      setLimit(40);
      let url = "/api/v1/product/get-product";

      url += `?pageNumber=${pageNumber}&limit=${limit}`;

      const { data } = await axios.get(url);
      setProducts(data.products);
      setCountTotal(data.countTotal);
    } catch (error) {
      console.log(error);
    }
  };

  // Product Filter Logic

  const handleFilter = (value) => {
    setSelectCategory(value);
  };
  const handleFilterSubject = (value) => {
    setSelectSubject(value);
  };
  useEffect(() => {
    if (!category && !subject) {
      getAllProduct();
    }
  }, [auth]);

  var subject = searchParams.get("subject")?.toString();
  var category = searchParams.get("class")?.toString();
  const page = parseInt(searchParams.get("page"));

  useEffect(() => {
    subject = searchParams.get("subject")?.toString();
    category = searchParams.get("class")?.toString();
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (selectCategory) {
      searchParams.set("class", selectCategory);
      setSearchParams(searchParams);
    }
    if (selectSubject) {
      searchParams.set("subject", selectSubject);
      setSearchParams(searchParams);
    }
  }, [selectCategory, selectSubject]);

  useEffect(() => {
    setSelectCategory(category);
    setSelectSubject(subject);
    if (subject || category) filterProduct();
  }, [subject, category]);

  // Set Class and subject at query params

  // Read query parameters

  const filterProduct = async () => {
    try {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
      setLimit(1000);
      const { data } = await axios.post("/api/v1/product/product-filters", {
        category: category,
        subject: subject,
        radio: selectRadio,
      });
      setProducts(data?.products);
      setCountTotal(data?.countTotal);
    } catch (error) {
      console.log(error);
    }
  };
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  const addItemCart = async (product) => {
    try {
      // Make POST request to add item to cart
      const { data } = await axios.post("/api/v1/product/cart/add-item", {
        userID: auth?.user.userID,
        productID: product._id,
        role: auth?.user?.role,
      });

      // Update cart state and localStorage with new item
      const updatedCart = [...cart, data.cart[0]];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Show success message
      swal("Success", "Your item has been added to the cart!", "success");
    } catch (error) {
      swal("Error", "Failed to add item to cart. Please Login.", "error");
    }
  };

  //view list click
  const handleViewListClick = () => {
    setViewMode("list");
  };

  //view in title
  const handleViewTitleClick = () => {
    setViewMode("title");
  };

  //reset button
  const handleReset = () => {
    searchParams.delete("class");
    searchParams.delete("subject");
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    setSelectCategory("");
    setSelectSubject("");
    setSelectRadio("");
    getAllProduct();
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  var length;
  const renderPage = () => {
    let pages = [];
    length = Math.ceil(countTotal / limit);
    // length = 10;
    if (length <= 4) {
      for (let i = 1; i <= length; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(length - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== length) {
          pages.push(i);
        }
      }

      if (currentPage < length - 2) {
        pages.push("...");
      }

      if (!pages.includes(length)) {
        pages.push(length);
      }
    }

    return pages;
  };
  const handlePageClick = (e, pageNumber) => {
    e.preventDefault(); // Prevent default behavior
    setCurrentPage(pageNumber);
    handlePageChange(pageNumber);
  };

  // let newCount = 0;

  // const isNewProduct = (product) => {
  //   // Convert the creation date string to a Date object
  //   if (newCount >= 30 || page !== 1) {
  //     return false;
  //   }
  //   // console.log(newCount);
  //   const creationDate = new Date(product.createdAt);
  //   const timeDifference = new Date() - creationDate;
  //   const differenceInDays = timeDifference / (1000 * 3600 * 24);
  //   if (differenceInDays <= 30) {
  //     newCount++;
  //     return true;
  //   }
  //   return false;
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // const renderBadge = (product) => {
  //   if (isNewProduct(product)) {
  //     return (
  //       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
  //         New
  //       </span>
  //     );
  //   }
  //   return null;
  // };
  // const setSelectRadio = (e) => {

  //   setSelectRadio(e.target.value);
  // };

  // Set the query param page number
  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (currentPage >= 1) {
      handlePageChange(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    // Set initial query parameters on component mount
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(page);
    if (!category && !subject) {
      getAllProduct(page);
    }
  }, [page]);

  return (
    <Layout>
      <div className="">
        <div className="hero-shop">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt-shop">
                  <h2>
                    Shop
                    <span className="us ms-1">
                      <b>by</b>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div
            className={`view-list p-2 `}
            style={{
              backgroundColor: viewMode === "list" ? "#e0731d" : "transparent",
            }}
            onClick={handleViewListClick}
          >
            <TfiViewListAlt
              style={{
                color: viewMode === "list" ? "white" : "black",
              }}
            />
          </div>
          <div
            className={`ms-4 p-1 view-title`}
            onClick={handleViewTitleClick}
            style={{
              backgroundColor: viewMode === "title" ? "#e0731d" : "transparent",
            }}
          >
            <MdOutlineCalendarViewMonth
              style={{
                color: viewMode === "title" ? "white" : "black",
              }}
            />
          </div>
          {/* {JSON.stringify(selectRadio, null, 4)} */}
          <div className="search-filter mr-3 custom-select">
            <select
              className="class-filter"
              style={{ textAlign: "center" }}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value={""} selected={selectCategory ? false : true}>
                Filter by Class &#9660;
              </option>
              {categories?.map((c) => (
                <option
                  key={c._id}
                  value={c._id}
                  selected={selectCategory == c._id ? true : false}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="search-filter mr-3 custom-select ms-2">
            <select
              className="class-filter"
              style={{ textAlign: "center" }}
              onChange={(e) => handleFilterSubject(e.target.value)}
            >
              <option value={""} selected={selectSubject ? false : true}>
                Filter by Subject &#9660;
              </option>
              {subjects?.map((s) => (
                <option
                  key={s._id}
                  value={s._id}
                  selected={selectSubject == s._id ? true : false}
                >
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="search-filter ml-3 custom-select ms-3">
            <select
              className="class-filter"
              style={{ textAlign: "center" }}
              onChange={(e) => setSelectRadio(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Filter by Subject &#9660;
              </option>
              {Prices?.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div> */}
          <div>
            <button
              className="refilter-button"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {/* <div className="">
          <div className="col-md-10 product-shop">
            {viewMode === "list" ? (
              <div className="row row-cols-1 row-cols-md-3">
                {products?.map((product, index) => (
                  <div className="col mb-4" key={product._id}>
                    <div className="card-8 ms-2 mb-2">
                      {isNewProduct(product) && (
                        <span
                          className="new-badge-shop"
                          style={{ marginTop: "9px" }}
                        >
                          <strong className="new">New</strong>
                        </span>
                      )}
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top-product"
                        alt={product.name}
                        style={{ width: "170px", height: "auto" }}
                      />
                      <div className="card-body">
                        <div className="card-name-price">
                          <h5 className="card-title-product">
                            {" "}
                            {product.name}
                          </h5>
                          <h5 className="card-desc">
                            {product.description.substring(0, 20)}...
                          </h5>
                          <h6 className="card-price">Price: {product.price}</h6>
                        </div>

                        <div className="card-name-price">
                          <button
                            className="more-details ms-1"
                            onClick={() => navigate(`/product/${product.uid}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="add-cart-butn ms-1 mb-4"
                            onClick={() => {
                              addItemCart(product);
                            }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-5 product-shop-title">
                {products?.map((product, index) => (
                  <div className="col mb-4" key={product._id}>
                    <div className="card-view-title ms-2 mb-2">
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top-product"
                        alt={product.name}
                        style={{ width: "220px", height: "auto" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-center">
              {products.length == 0 && (
                <div className="">
                  {" "}
                  <h5 className="not-found">No record Found</h5>
                </div>
              )}
            </div>
          </div>
        </div> */}
        <div className="">
          <div className="col-md-12 product-shop">
            <div
              className={`row row-cols-1 row-cols-sm-2 row-cols-md-3 ${
                viewMode !== "list" &&
                "row-cols-sm-3 row-cols-md-3 row-cols-lg-4 "
              } `}
            >
              {products?.map((product, index) => (
                <div
                  className="col d-flex justify-content-center"
                  key={product._id}
                  style={{ marginBottom: "3rem" }}
                >
                  <Link to={`/product/${product.uid}`}>
                    <div className="card-8 ms-2 mb-2">
                      {/* <div>
                        {isNewProduct(product) && (
                          <span className="new-badge-shop">
                            <strong className="new">New</strong>
                          </span>
                        )}
                      </div> */}
                      <div className="title-img">
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top-product"
                          alt={product.name}
                          style={{ width: "190px", minheight: "auto" }}
                        />
                        {viewMode === "title" && <p>{product.name}</p>}
                      </div>

                      {viewMode !== "title" && (
                        <div className="card-body">
                          <div className="card-name-price">
                            <h5 className="card-title-product">
                              {product.name}
                            </h5>
                            <h5 className="card-desc">
                              {product.description.substring(0, 20)}...
                            </h5>
                            <h6 className="card-price">
                              Price: {product.price}
                            </h6>
                          </div>
                          <div className="card-name-price">
                            <button
                              className="more-details ms-1"
                              onClick={() =>
                                navigate(`/product/${product.uid}`)
                              }
                            >
                              More Details
                            </button>
                            <button
                              className="add-cart-butn ms-1 mb-4"
                              onClick={() => {
                                addItemCart(product);
                              }}
                            >
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center">
              {products.length === 0 && (
                <div className="">
                  <h5 className="not-found">No record Found</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div>
          <nav aria-label="Page navigation example">
            <ul className="pagination page">
              <li
                className={`page-item ${currentPage <= 1 && "disabled"}`}
                onClick={(e) => {
                  if (currentPage <= 1) return;
                  setCurrentPage(currentPage - 1);
                }}
              >
                <a
                  className="page-link"
                  href="javascript:void(0)"
                  disabled={currentPage <= 1}
                >
                  Prev
                </a>
              </li>
              {renderPage().map((x, i) => (
                <li className="page-item" key={x}>
                  {x === "..." ? (
                    <span className="page-link">...</span>
                  ) : (
                    <a
                      className={`page-link ${
                        x === parseInt(page) && "active-page"
                      }`}
                      href="javascript:void(0)"
                      onClick={(e) => handlePageClick(e, x)}
                    >
                      {x}
                    </a>
                  )}
                </li>
              ))}

              <li
                className={`page-item ${currentPage >= length && "disabled"}`}
                onClick={(e) => {
                  console.log("Current page: ", currentPage + 1);
                  if (currentPage >= length) return;
                  setCurrentPage(currentPage + 1);
                }}
              >
                <a
                  className="page-link"
                  href="javascript:void(0)"
                  disabled={currentPage >= length}
                >
                  Next
                </a>
              </li>
            </ul>
            <div className="d-flex justify-content-center jump-to align-items-center">
              {/* Jump to page */}
              <p className="jump-to-text me-2">or </p>
              <input
                type="number"
                placeholder="page"
                className="jump-to-input p-1"
                onChange={(e) => setJumpPage(e.target.value)}
              />
              <button
                className="jump-to-btn"
                type="submit"
                onClick={() => handlePageChange(jumpPage)}
              >
                Go
              </button>
            </div>
          </nav>
        </div>
      </div>
      <hr className="ash-line" />
    </Layout>
  );
};

export default Shop;
