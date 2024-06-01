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
  const [address, setAddress] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      // Check if captcha is not completed
      toast.error("Please complete the captcha.");
      return;
    }
    try {
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
                // pattern="[7-9]{1}[0-9]{9}"
                // title="Phone number with 7-9 and remaining 9 digit with 0-9"
                placeholder="Phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              sitekey="6Ldp758pAAAAAKJ-yqRCEOVuyKVUDxkYRX06dVaC"
              onChange={onChangeCaptcha}
              className="mb-4"
            />

            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CreateAdmin;
