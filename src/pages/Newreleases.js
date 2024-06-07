import React from "react";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "../styles/textbookgallery.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
const Newreleases = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/new-release/get-new-release");
      setProducts(data.newRelease);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <Layout>
        <div className="textbook">
          <div className="hero-shop">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-lg-5">
                  <div className="intro-excerpt-shop">
                    <h2>
                      New
                      <span className="us ms-1">
                        <b>Releases</b>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 product-shop mt-5">
            <div
              className={`row row-cols-1 row-cols-sm-2 row-cols-md-3 
                row-cols-sm-3 row-cols-md-3 row-cols-lg-4
              `}
            >
              {products?.map((product, index) => (
                <div
                  className="col d-flex justify-content-center"
                  key={product._id}
                  style={{ marginBottom: "3rem" }}
                >
                  <div className="card-8 ms-2 mb-2 justify-content-center">
                    <div>
                      <span className="new-badge-shop">
                        <strong className="new">New</strong>
                      </span>
                    </div>
                    <div className="title-img">
                      <img
                        src={`/api/v1/new-release/get-new-release-image/${product._id}`}
                        className="card-img-top-product"
                        alt={product.booktitle}
                        style={{ width: "190px", minheight: "auto" }}
                      />
                      <p>{product?.booktitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Newreleases;
