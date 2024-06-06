import React, { useEffect, useRef, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { SlLocationPin } from "react-icons/sl";
import "../styles/contact.css";
import { LuMailCheck } from "react-icons/lu";
import { FiPhoneForwarded } from "react-icons/fi";
import map from "../images/qr.jpg";
import { FaMapLocationDot } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Contact = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const form = useRef();
  const navigate = useNavigate();

  const handleFilterState = (value) => {
    setSelectedState(value);
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_8hpq5je", "template_kv9dd9f", form.current, {
        publicKey: "7dWbkJYVm3Lnl61G3",
      })
      .then(
        () => {
          swal("Your query has been sent successfully.", "Sent", "success");
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const getAllStates = async () => {
    try {
      const { data } = await axios.get("/api/v1/dealerstate/get-state");
      if (data?.success) {
        setStates(data?.dealerState);
        console.log(data?.dealerState);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  useEffect(() => {
    getAllStates();
  }, []);

  const handleFilterSelect = (selectedState) => {
    navigate(`/view-dealer-network?state=${selectedState}`);
  };
  return (
    <Layout title={"Contact us - Arrow Publication Pvt ltd"}>
      <div className="hero-5">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>
                  Contact
                  <span className="something ms-1">
                    <b>Us</b>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body1">
        <div className="p-1 d-flex justify-content-around mt-3 ">
          <div className="px-3 pt-1 pb-3 border w-26 cart">
            <p className="address">
              <SlLocationPin className="location-icon" /> C-11 A & B, TSIIC,
              Moula-Ali, Hyderabad - 500 040
            </p>
          </div>
          <div className="px-3 pt-2 pb-3 border w-26 cart">
            <div className="text-center pb-1">
              <div className="mail">
                <span>
                  {" "}
                  <LuMailCheck className="mail-icon" />{" "}
                </span>
                mail@arrowpublicationindia.com
              </div>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border w-25 cart">
            <div className="text-center pb-1">
              <div className="phone">
                <span>
                  {" "}
                  <FiPhoneForwarded className="phone-icon" />
                </span>
                +91 -9100999026, 9100999027
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="">
                <h4 className="enq">View Arrow Executives</h4>
                <div className="executive-search-filter executive-custom-select">
                  <select
                    className="executive-class-filter"
                    style={{ textAlign: "center" }}
                    onChange={(e) => handleFilterSelect(e.target.value)}
                  >
                    <option
                      className="option"
                      value={selectedState}
                      selected={selectedState ? false : true}
                    >
                      Arrow Executives &#9660;
                    </option>

                    {states?.map((s) => (
                      <option
                        key={s._id}
                        value={s._id}
                        selected={selectedState == s._id ? true : false}
                      >
                        {s.state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="enquiry-container enquiry-text">
                <h4 className="enq">
                  <b>Enquiry</b>
                </h4>
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputName"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Name<span class="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      {" "}
                      <input
                        type="text"
                        className="form-control input"
                        name="from_name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputMobile"
                      className="col-sm-4 col-form-label inputname "
                    >
                      Mobile<span class="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      {" "}
                      <input
                        type="tel"
                        className="form-control input"
                        // id="inputMobile"
                        // value={mobile}
                        // onChange={(e) => setMobile(e.target.value)}
                        name="from_mobile"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputEmail"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Email<span class="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control input"
                        // id="inputEmail"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        name="from_email"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputAddress"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Address
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control input"
                        // id="inputAddress"
                        // value={address}
                        // onChange={(e) => setAddress(e.target.value)}
                        name="from_address"
                      />
                    </div>
                  </div>
                  <button className="submit-butn" type="submit" value="Send">
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-6 location">
              <FaMapLocationDot className="loc-icon" />
              <img src={map} alt="" className="qr" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="subscribe">
        <h5 className="about-arrow">
          Want to know more about Arrow Publications?
          <div className="form-floating ms-2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <button className="ms-3 button">Submit</button>
        </h5>
      </div> */}
    </Layout>
  );
};

export default Contact;
