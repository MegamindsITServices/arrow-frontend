import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { getConfig, axiosInstance } from "../../utils/request";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
// import swal from "sweetalert";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AdminProfileUpdate from "../../components/Form/AdminProfileUpdate";
const OwnerDetails = () => {
  const navigate = useNavigate();

  const [updateOwner, setUpdateOwner] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [visible, setVisible] = useState(false);
  const [getOwner, setGetOwner] = useState([]);
  // get owners details
  useEffect(() => {
    const getAllOwners = async () => {
      try {
        await getConfig();
        const res = await axiosInstance.get("/api/v1/auth/get-owners");
        setGetOwner(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("error Fetching owner details");
      }
    };
    getAllOwners();
  }, []);
  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  //update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await getConfig();
      const { data } = await axiosInstance.put(
        `/api/v1/auth/admin-profile-update/${selectedOwner._id}`,
        updateOwner
      );
      if (data.success) {
        swal("Congrats!", "Dealer Updated Successfully!", "success");
        navigate("/dashboard/admin/dashboard");
        selectedOwner(null);
        setUpdateOwner("");
        setVisible(false);
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.delete(
        `/api/v1/auth/delete-owner/${id}`
      );
      if (data.success) {
        swal("SuccessFull", "Dealer deleted successful", "success");
        navigate("/dashboard/admin/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
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
              <h1 className="text-center">All Owners Details</h1>
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Owner_Name</th>
                      <th scope="col">Owner_Email</th>
                      <th scope="col">Owner_Address</th>
                      <th scope="col">Owner_phone</th>
                      <th scope="col">Date of Register</th>
                      <th scope="col">Delete Owner</th>
                      <th scope="col">Update Owner Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOwner.map((o, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td scope="row">{o.name}</td>
                        <td scope="row">{o.email}</td>
                        <td scope="row">
                          {o.address.district}, {o.address.district},{" "}
                          {o.address.state}
                        </td>
                        <td scope="row">{o.phone}</td>
                        <td>{formatDateTime(o.createdAt)}</td>
                        <td>
                          <button
                            className="dlt-button ms-2"
                            onClick={() => handleDelete(o._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="admin-profile-update"
                            onClick={() => {
                              setVisible(true);
                              setUpdateOwner(o);
                              setSelectedOwner(o);
                            }}
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
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <AdminProfileUpdate
                value={updateOwner}
                setValue={setUpdateOwner}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OwnerDetails;
