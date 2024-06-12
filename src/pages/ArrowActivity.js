import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Arrowactivity.css";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { axiosInstance, getConfig } from "../utils/request";
const ArrowActivity = () => {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getConfig();
        const response = await axiosInstance.get("/api/v1/posts/get-all-posts");

        if (response.data && Array.isArray(response.data.posts)) {
          setAllPosts(response.data.posts);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Layout>
        <div className="hero-shop">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <div className="intro-excerpt-activity">
                  <h2>
                    Arrow
                    <span className="us ms-1">
                      <b>Activity</b>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container arrow-activity mt-5">
          <div class="row">
            {allPosts.map((post, index) => (
              <>
                <div class="col-lg-8" key={index}>
                  <div class="content-info">
                    <h4>{post.title}</h4>
                    <p className="date">{post.addresswithdate}</p>
                    <p className="content">{post.content}</p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="carousel-container-arrow">
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="d-block carouse-img-arrow"
                          src={`/api/v1/posts/get-photo/${post.slug}`}
                          alt="First slide"
                          height={"200px"}
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block carouse-img-arrow"
                          src={`/api/v1/posts/get-secondphoto/${post.slug}`}
                          alt="Second slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block carouse-img-arrow"
                          src={`/api/v1/posts/get-thirdphoto/${post.slug}`}
                          alt="Third slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <hr className="ash-line" />
      </Layout>
    </>
  );
};

export default ArrowActivity;
