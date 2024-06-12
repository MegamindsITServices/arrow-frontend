import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/button.css";
import "../styles/style.css";
import "../styles/homepage.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import button1 from "../images/tbgallery.png";
import button2 from "../images/newrelease.png";
// import homebackground from "../images/home-hero.jpg";
// import homebackground1 from "../images/banner-2c.jpg";
// import homebackground2 from "../images/banner-2b.jpg";
// import homebackground from "../images/banner-2a.jpg";
// import { AiOutlineDoubleRight } from "react-icons/ai";
// import { AiOutlineDoubleLeft } from "react-icons/ai";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [getHomeBook, setGetHomeBook] = useState([]);

  
  const increaseVisitorCount = async () => {
    await axios.get("/api/visitor-count");
  };

  useEffect(() => {
    increaseVisitorCount();
  }, []);
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1180 },
      items: 6, // Display 6 items in a row on desktop
    },
    tablet: {
      breakpoint: { max: 1180, min: 769 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  const isNewProduct = (p) => {
    // Convert the creation date string to a Date object
    const creationDate = new Date(p.createdAt);
    const timeDifference = new Date() - creationDate;
    const differenceInDays = timeDifference / (1000 * 3600 * 24);
    // Return true if the product is less than or equal to 3 days old, otherwise false
    return differenceInDays <= 30;
  };

  // to fetch all the banners
  const getAllBanners = async () => {
    try {
      const { data } = await axios.get("/api/v1/banner/get-banner");
      setBanners(data.banner);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBanners();
  }, []);

  // to fetch all the book images

  const getAllBookImage = async () => {
    try {
      const { data } = await axios.get("/api/v1/bookphoto/get-home-book");
      setGetHomeBook(data.homeBook);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBookImage();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Arrow Publication Pvt. Ltd.</title>
        <meta
          name="description"
          content="Welcome to Arrow Publication Pvt. Ltd. We offer a wide range of textbooks and educational resources for students."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Layout title={"Home - Arrow Publication Pvt. Ltd."}>
        {/* <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="4000" 
        >
          <div className="carousel-inner">
            {banners.map((banner, index) => (
              <div key={index}>
                <div className="carousel-item active">
                  <img
                    src={`/api/v1/banner/get-first-banner-image/banner`}
                    alt={banner.title}
                    className="d-block w-100"
                  />
                  <div className="carousel-caption text-start">
                    <div className="intro-excerpt1">
                      <div className="first-line">
                        <h1>
                          <span className="learn">Learn</span>
                        </h1>
                        <p className="something-learn text-white">Something</p>
                      </div>
                      <div className="second-line">
                        <span className="d-block something-learn text-white">
                          New
                        </span>
                        <h1>
                          <span className="learn ms-3">Every Day</span>
                        </h1>
                      </div>
                    </div>
                    <div>
                      <p className="first-mobile">
                        <b className="learn-mobile">Learn</b>
                        <span className="ms-1">Something</span> <br /> New{" "}
                        <b className="everyday-mobile">Every Day</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {banners.map((b, index) => (
              <div key={index}>
                <div className="carousel-item custom-carousel">
                  <img
                    src={`/api/v1/banner/get-second-banner-image/banner`}
                    className="d-block w-100"
                    alt={b.title}
                  />
                  <div className="carousel-caption text-start">
                    <div className="intro-exc">
                      <h3 className="heading1">
                        <b className="orange">Learn</b>
                        <span className="black ms-1">
                          Something
                        </span> <br /> <span className="black">new</span>{" "}
                        <b className="orange">Everyday</b>
                      </h3>
                      <p className="heading1-mobile">
                        <b className="learn-mobile">Learn</b>
                        <span className="ms-1">Something</span> <br /> New{" "}
                        <b className="everyday-mobile">Every Day</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {banners.map((banner, index) => (
              <div key={index}>
                <div className="carousel-item custom-carousel">
                  <img
                    src={`/api/v1/banner/get-third-banner-image/banner`}
                    className="d-block w-100"
                    alt={banner.title}
                  />
                  <div className="carousel-caption text-start">
                    <div className="intro-exc">
                      <h1 className="heading1">
                        <b className="orange">Learn</b>
                        <span className="black ms-1">
                          Something
                        </span> <br /> <span className="black">New</span>{" "}
                        <b className="orange">Everyday</b>
                      </h1>
                      <p className="heading1-mobile">
                        <b className="learn-mobile">Learn</b>
                        <span className="ms-1">Something</span> <br /> New{" "}
                        <b className="everyday-mobile">Every Day</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div> */}
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div className="carousel-inner">
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`/api/v1/banner/get-first-banner-image/banner`}
                  alt={banner.title}
                  className="d-block w-100"
                  style={{ width: "100%", height: "auto" }} // Set fixed dimensions
                />
                <div className="carousel-caption text-start">
                  <div className="intro-excerpt1">
                    <div className="first-line">
                      <h1>
                        <span className="learn">Learn</span>
                      </h1>
                      <p className="something-learn text-white">Something</p>
                    </div>
                    <div className="second-line">
                      <span className="d-block something-learn text-white">
                        New
                      </span>
                      <h1>
                        <span className="learn ms-3">Every Day</span>
                      </h1>
                    </div>
                  </div>
                  <div>
                    <p className="first-mobile">
                      <b className="learn-mobile">Learn</b>
                      <span className="ms-1">Something</span> <br /> New{" "}
                      <b className="everyday-mobile">Every Day</b>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {banners.map((b, index) => (
              <div key={index} className="carousel-item custom-carousel">
                <img
                  src={`/api/v1/banner/get-second-banner-image/banner`}
                  className="d-block w-100"
                  alt={b.title}
                  style={{ width: "100%", height: "auto" }} // Set fixed dimensions
                />
                <div className="carousel-caption text-start">
                  <div className="intro-exc">
                    <h3 className="heading1">
                      <b className="orange">Learn</b>
                      <span className="black ms-1">Something</span> <br />{" "}
                      <span className="black">new</span>{" "}
                      <b className="orange">Everyday</b>
                    </h3>
                    <p className="heading1-mobile">
                      <b className="learn-mobile">Learn</b>
                      <span className="ms-1">Something</span> <br /> New{" "}
                      <b className="everyday-mobile">Every Day</b>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {banners.map((banner, index) => (
              <div key={index} className="carousel-item custom-carousel">
                <img
                  src={`/api/v1/banner/get-third-banner-image/banner`}
                  className="d-block w-100"
                  alt={banner.title}
                  style={{ width: "100%", height: "auto" }} // Set fixed dimensions
                />
                <div className="carousel-caption text-start">
                  <div className="intro-exc">
                    <h1 className="heading1">
                      <b className="orange">Learn</b>
                      <span className="black ms-1">Something</span> <br />{" "}
                      <span className="black">New</span>{" "}
                      <b className="orange">Everyday</b>
                    </h1>
                    <p className="heading1-mobile">
                      <b className="learn-mobile">Learn</b>
                      <span className="ms-1">Something</span> <br /> New{" "}
                      <b className="everyday-mobile">Every Day</b>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="font">
          <div className="square-button-container">
            <div style={{ position: "relative" }}>
              <NavLink to="/textbook-gallery">
                <img src={button2} alt="button2" className="button2" />
                <div className="image-text">Textbook Gallery</div>
              </NavLink>
            </div>
            <div className="second-image-btn" style={{ position: "relative" }}>
              <NavLink to="/new_release">
                <img src={button1} alt="button" className="button1" />
                <div className="image-texts">
                  New <br />
                   Releases
                </div>
              </NavLink>
            </div>
          </div>

          <div className="body">
            <div className="on-target">
              <h3>
                On{" "}
                <span className="something">
                  <b>Target</b>
                </span>{" "}
                <MdKeyboardDoubleArrowRight className="double-arrow" />
              </h3>
              <p>
                ➤ Arrow Publications Pvt. Ltd., a strong presence in 14 states
              </p>
              <p>
                ➤ Meeting the growing needs of more than 12,000 schools across
                India
              </p>
              <p>➤ Wide range of textbooks from pre-primary to high school</p>
              <p>
                ➤ Portfolio of 500 publications in compliance with curricula of
                school boards{" "}
              </p>
              <p>
                ➤ Content, pedagogy and assessments in sync with 2022 (NCF-FS)
                and 2023 (NCF-SE)
              </p>
              <p>➤ ISO 9001: 2015 certified company</p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="carousel-item-width-40-px"
            renderButtonGroupOutside={true}
            arrows={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            customLeftArrow={<div className="custom-left-arrow"></div>}
            customRightArrow={<div className="custom-right-arrow"></div>}
          >
            {/* {products.map((p, index) => (
              <div className="card-1 m-4" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-homepage"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                />
              </div>
            ))} */}
            {getHomeBook.map((book, index) => (
              <div className="card-1 m-4" key={index}>
                <img
                  src={`/api/v1/bookphoto/get-home-book-image/${book._id}`}
                  className="card-img-homepage"
                  alt={book.booktitle}
                  // onClick={() => navigate(`/product/${p.slug}`)}
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* <div className="swiper">
          <Swiper
         
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
          >
            {products.map((p, index) => (
              <>
                <SwiperSlide key={index}>
                  <div>
                    {isNewProduct(p) && (
                      <span
                        className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger badge-new"
                        style={{ marginTop: "9px" }}
                      >
                        <strong className="new">New</strong>
                      </span>
                    )}
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-textbook"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      alt={p.name}
                    />
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div> */}
        {/* <div className="swiper">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {products.map((p, index) => (
              <>
                <SwiperSlide key={index}>
                  <div>
                    {isNewProduct(p) && (
                      <span
                        className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger badge-new"
                        style={{ marginTop: "9px" }}
                      >
                        <strong className="new">New</strong>
                      </span>
                    )}
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-textbook"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      alt={p.name}
                    />
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div> */}
        <div className="desktop">
          <div className="subscribe mt">
            <div className="about-arrow">
              Want to know more about Arrow Publications?
              <div className="form-floating ms-2">
                <input
                  type="email"
                  className="form-control form"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <button className="ms-3 button-sub">Submit</button>
            </div>
          </div>
        </div>

        <div className="mobile-response">
          <div className="subscribe mt">
            <div className="about-arrow">
              <h6 className="want-know">
                Want to know more about Arrow Publications?
              </h6>
              <div className="input-group">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control form"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <button className="button-sub">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
