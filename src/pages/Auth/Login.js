import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../context/Auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [captchaValue, setCaptchaValue] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      // Check if captcha is not completed
      toast.error("Please complete the captcha.");
      return;
    }
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
        captchaValue,
      });
      if (res && res.data.success) {
        toast.success("Login successful!");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        window.location.href = "/";
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handler for captcha change
  const onChangeCaptcha = (value) => {
    setCaptchaValue(value);
  };
  return (
    <Layout title="Sign in - Arrow">
      <div className="form-container-login " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          {/* <h4 className="title">Sign in to Arrow !</h4> */}

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control input-login"
              id="exampleInputEmail1"
              placeholder="Email "
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
          <div className="mb-3 form-link forgot">
            <ReCAPTCHA
              sitekey="6Ldp758pAAAAAKJ-yqRCEOVuyKVUDxkYRX06dVaC"
              onChange={onChangeCaptcha}
              className="mb-3 captcha"
            />

            <button type="submit" className="login-button-login">
              LOGIN
            </button>
            <Link className="forgot-password" to="/forgot-password">
              Forgot Password
            </Link>
            <div>
              <p>
                Don't have an account?{" "}
                <NavLink to="/signup" className="signup-link">
                  Sign up
                </NavLink>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
