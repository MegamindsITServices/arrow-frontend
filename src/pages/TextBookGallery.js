import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "../styles/textbookgallery.css";
import PDF from "../images/pdfimg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
const TextBookGallery = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <Layout>
        <div className="hero-shop">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt-textbook">
                  <h2>
                    Textbook
                    <span className="us ms-1">
                      <b>Gallery</b>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="textbook-body">
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
              {products.map((p, index) => (
                <div className="card-1 m-4" key={p._id}>
                  {isNewProduct(p) && (
                    <span className="badge-new" style={{ marginTop: "9px" }}>
                      <strong className="new">New</strong>
                    </span>
                  )}
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-homepage"
                    alt={p.name}
                    onClick={() => navigate(`/product/${p.uid}`)}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {/* <div className="d-flex justify-content-between align-items-center download-catalogue">
            <img src={PDF} height="36px" className="pdf" alt="" />
            <div className="download">
              <a
                href="https://example.com/kids-book-catalogue.pdf"
                className="download-catalogue-link "
              >
                <h6>Download Catalogue</h6>
              </a>
            </div>
          </div> */}
          <div className="d-flex justify-content-center">
            <div className="download">
              <img src={PDF} height="36px" alt="" />
              <a
                href="https://example.com/kids-book-catalogue.pdf"
                className="download-catalogue-link "
              >
                <h6>
                  Download<span className="ms-1">Catalogue</span>
                </h6>
              </a>
            </div>
          </div>
        </div>
        {/* <div className="swiper">
          <Swiper
      
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="mySwiper"
            breakpoints={{
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
        {/* <div className="swiper-mobile">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {products.map((p, index) => (
              <>
                <SwiperSlide key={index}>
                  <div>
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

        <hr className="ash-line" />
      </Layout>
    </>
  );
};

export default TextBookGallery;
