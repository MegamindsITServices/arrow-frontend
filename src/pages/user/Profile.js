import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";

import axios from "axios";
import toast from "react-hot-toast";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const [locality, setLocality] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  //get user details
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setShippingAddress(address.shippingAddress);
    setCity(address.city);
    setState(address.state);
    setDistrict(address.district);
    setLocality(address.locality);
    setLandmark(address.landmark);
    setPincode(address.pincode);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const address = {
        shippingAddress,
        city,
        state,
        district,
        locality,
        landmark,
        pincode,
      };
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form className="form-user-profile" onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
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
                        id="exampleInputEmail1"
                        placeholder="Enter your password"
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
                        placeholder="Shipping Address"
                        required
                      />
                    </div>
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
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
