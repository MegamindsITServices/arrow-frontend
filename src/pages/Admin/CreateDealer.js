import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
// import axios from "axios";
import toast from "react-hot-toast";
import { getConfig, axiosInstance } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
import swal from "sweetalert";
const { Option } = Select;
const CreateDealer = () => {
  const navigate = useNavigate();
  const [dealername, setDealername] = useState("");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [states, setStates] = useState([]);
  const [area, setArea] = useState("");
  const [designation, setDesignation] = useState("");
  const [state, setState] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("dealername", dealername);
      formData.append("state", state);

      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("designation", designation);

      formData.append("area", area);
      formData.append("photo", photo);

      const { data } = await axios.post(
        "/api/v1/dealer/create-dealer",
        formData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        swal("Congrats", "Post Uploaded SuccessFully", "success");
        console.log(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await getConfig();

  //     const formData = new FormData();
  //     formData.append("dealername", dealername);
  //     formData.append("personname", personname);
  //     formData.append("address", address);
  //     formData.append("phone", phone);
  //     formData.append("email", email);
  //     formData.append("state", state);
  //     formData.append("photo", photo);

  //     const res = await axiosInstance.post(
  //       "/api/v1/dealer/create-dealer",
  //       formData
  //     );

  //     if (res.data && res.data.success) {
  //       toast.success(res.data.message);
  //       navigate("/dashboard/admin/view_dealers");
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const getAllState = async () => {
    try {
      const response = await axios.get("/api/v1/dealerstate/get-state");
      const data = response.data;
      // console.log("Response data:", data);
      if (data && data.success) {
        // console.log("Setting states:", data.dealerState);
        setStates(data.dealerState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllState();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Executive Network</h1>

              <div className="mb-3">
                <form onSubmit={handleCreate}>
                  <div className="col-md-8">
                    <Select
                      bordered={false}
                      placeholder="Select State"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setState(value);
                      }}
                    >
                      {states?.map((state) => (
                        <Option key={state._id} value={state._id}>
                          {state.state}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="mb-3">
                    <label className="Butn col-md-8">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  {/* <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div> */}
                  <div className="mb-3">
                    <input
                      type="text"
                      value={dealername}
                      onChange={(e) => setDealername(e.target.value)}
                      placeholder="Name"
                      className="form-control admin-form"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="form-control admin-form"
                      required
                    />
                  </div>
                  {/* <div className="mb-3">
                    <input
                      type="text"
                      value={personname}
                      onChange={(e) => setPersonname(e.target.value)}
                      className="form-control admin-form"
                      placeholder="Person Name"
                      required
                    />
                  </div> */}
                  <div className="mb-3">
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Enter Designation"
                      className="form-control admin-form"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control admin-form"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control admin-form"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Enter area"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control admin-form"
                      placeholder="Full Address"
                      required
                    />
                  </div>

                  <button type="submit" className="login-button">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateDealer;
