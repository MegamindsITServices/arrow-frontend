import React, { useState, useEffect } from "react";
// import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { Modal } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import "../../styles/Viewdealer.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { getConfig, axiosInstance } from "../../utils/request";
import DealerUpdateForm from "../../components/Form/DealerUpdateForm";
const ViewDealers = () => {
  const navigate = useNavigate();
  const [getdealerNetwork, setGetDealerNetwork] = useState([]);
  const [updateDealer, setUpdateDealer] = useState("");

  const [selectedDealer, setSelectedDealer] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const getAllDealers = async () => {
      try {
        await getConfig();
        const res = await axiosInstance.get("/api/v1/dealer/get-all-dealer");
        setGetDealerNetwork(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("error fetching dealers", error);
      }
    };
    getAllDealers();
  }, []);

  //delete a dealer
  const handleDelete = async (pId) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.delete(
        `/api/v1/dealer/delete-dealer/${pId}`
      );
      if (data.success) {
        swal("SuccessFull", "Dealer deleted successfully", "success");
        // getAllDealers();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  //update reviews
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await getConfig();
      const { data } = await axiosInstance.put(
        `/api/v1/dealer/update-dealer/${selectedDealer._id}`,
        updateDealer // Send the entire updateDealer object
      );
      if (data.success) {
        swal("Congrats!", "Dealer Updated Successfully!", "success");
        navigate("/dashboard/admin/dashboard");
        setSelectedDealer(null);
        setUpdateDealer("");
        setVisible(false);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="col-md-12">
                <h1 className="text-center">All Executives</h1>
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getdealerNetwork.map((d, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>{d.dealername}</td>
                          <td>{d.email}</td>
                          <td>{d.address}</td>
                          <td>{d.phone}</td>
                          <td>
                            <button
                              className="dlt-button ms-2"
                              onClick={() => {
                                handleDelete(d._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/admin/update_executive/${d._id}`
                                )
                              }
                              className="dealer-update-button ms-2"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <DealerUpdateForm
                  value={updateDealer}
                  setValue={setUpdateDealer}
                  handleSubmit={handleUpdate}
                />
              </Modal> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewDealers;
