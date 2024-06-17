import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import ReCAPTCHA from "react-google-recaptcha";

const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      // Check if captcha is not completed
      toast.error("Please complete the captcha.");
      return;
    }
    try {
      const address = {
        shippingAddress,
        city,
        locality,
        state,
        district,
        pincode,
        landmark,
      };
      const res = await axios.post("/api/v1/auth/admin-register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
        captchaValue, // Include captcha value in the request
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/dashboard/admin/owner_details");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onChangeCaptcha = (value) => {
    setCaptchaValue(value);
  };
  return (
    <>
      <Layout title={"Signup - Arrow Publication Pvt Ltd"}>
        <div className="form-container">
          {/* <h1>Register</h1> */}
          <form onSubmit={handleSubmit}>
            <div className="row w-100 form-content">
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    pattern="\d*"
                    // pattern="[7-9]{1}[0-9]{9}"
                    // title="Phone number with 7-9 and remaining 9 digit with 0-9"
                    placeholder="Phone"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="form-control input-login"
                    id="securityQuestion"
                    required
                  >
                    <option value="">Select Security Question</option>
                    <option value="favoritePetName">Favorite Pet Name</option>
                    <option value="favoriteFood">Favorite Food</option>
                    <option value="childhoodbestfriend">
                      your childhood best friend
                    </option>
                    {/* Add more security questions as needed */}
                  </select>
                </div>
                {securityQuestion === "favoriteFood" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="form-control input-login"
                      id="answer"
                      placeholder="Enter Favorite Food"
                      required
                    />
                  </div>
                )}
                {securityQuestion === "favoritePetName" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="form-control input-login"
                      id="answer"
                      placeholder="Enter pet name"
                      required
                    />
                  </div>
                )}
                {securityQuestion === "childhoodbestfriend" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="form-control input-login"
                      id="answer"
                      placeholder="Enter your childhood best friend"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="State"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="District"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="Locality"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="Landmark"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    pattern="\d*"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="form-control input-login"
                    id="exampleInputEmail1"
                    placeholder="Pincode"
                    required
                  />
                </div>
              </div>
              {/* <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Favourite Food "
                required
                style={{ width: "86%" }}
              />
            </div> */}
              <ReCAPTCHA
                sitekey="6LdBiPopAAAAAByRk-w6oHFApDI5t_w7GdRRyfOO"
                onChange={onChangeCaptcha}
                className="mb-4"
              />

              <button type="submit" className="login-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CreateAdmin;
